pragma solidity ^0.8.0;
// SPDX-License-Identifier: MIT

contract PokerRoom{
    uint256 private value;
    address private server;
    address private roomAddress = address(this);
    address private expectedUserAddress = address(0);
    uint256 public pooledAmount;
    uint256 public currentBet;
    string[] public initialDeck;//conating the 52 cards.
    string[] public gameDeck;//containg the 17 cards.
    uint[] coPrimesOf52 = [3,5,7,9,11,15,17,19,21,23,27,29,31,33,35,37,39,41,43,45,47,51];//used to do Affine Cipher on the deck
    uint8 userCount;
    bool public theDeckCreated = false;
    string deckHash = "";
    uint256 private GENERATEDRANDOMNUMBER= 113123;//from QRNG.
    uint256 GAMENONCE;
    string PRIVATEKEYTODECODECARDS;// will be posted after the each game.
    GameState stateDefiner;

    enum GameState{ 
        RESTING,
        FIRSTLOOP,
        SECONDLOOP,
        THIRDLOOP,
        ENDED
    }
    struct userData{
        address userAddress;
        string publicKey;
        bool isFolded;
    }


    userData[] Users;

    constructor( address _server,uint256 _initialBet,string[] memory _deck){
        require(_server != address(0),'{"statusCode": 400, "message": "the server address not specified!"}');
        server = _server;
        userCount = 0;
        pooledAmount = 0;
        currentBet = _initialBet;
        GAMENONCE = 0;
        for(uint i=0;i<54;i++){
            initialDeck.push(_deck[i]);
        }
    }
    
    //events
    //emitCode: 1
    event UserFoldedWithReason(uint8 emitCode , uint256 indexed createdOn , address indexed createdBy, address foldAddress, string reason);
    //emitCode: 2
    event betRaised(uint8 emitCode , uint256 indexed createdOn , address indexed createdBy , address raisersAddress, uint256 raisedTo, uint256 currentPot, address nextUser);
    //emitCode: 3
    event betCalled(uint8 emitCode , uint256 indexed createdOn , address indexed createdBy , address callerAddress, uint256 currentPot, address nextUser);
    //eventCode: 4
    event deckPost(uint8 emitCode , uint256 indexed createdOn , address indexed createdBy , uint256 nonce , string[] cards17);
    //eventCode: 5
    event gameConcluded(uint8 emitCode , uint256 indexed createdOn );
    //eventCode: 6
    event StateDiscloser(uint8 emitCode , uint256 indexed createdOn , GameState stateTransitationTo);

    //modifiers
    modifier onlyServer {
        require(msg.sender == server,'{"statusCode": 401, "message": "unauthorised"');
        _;
    }
    modifier expectedUser {
        require(msg.sender == expectedUserAddress,'{"statusCode": 401, "message": "Not your turn"');
        require(stateDefiner != GameState.ENDED, '{"statusCode": 100, "message": "game allready ended"}');
        _;
    }

    //functions
    function gameInit(userData[] memory users) public onlyServer returns(bool){
        //setes the users...
        require(users.length == 6,'{"statusCode": 422, "message": "invalid user address."');
        uint8 count = 0;
        for(uint i=0;i<6;i++){
            require(users[i].userAddress != address(0) ,"Invalid address");
            Users[i] = users[i];
            if(!users[i].isFolded){
                count++;
            }
        }
        userCount = count;
        return true;
    }

    function hardResetWithCleanup(address payable _winner) public onlyServer {
        require(stateDefiner == GameState.ENDED,'{"statusCode": 400, "message": "Game hasent ended yet."');
        delete Users;
        userCount = 0;
        GENERATEDRANDOMNUMBER = 0;
        stateDefiner = GameState.RESTING;
        { bool success } = payable(_winner).transfer(pooledAmount );
        require(success, '{"status" : 500, "message" : "Something went very wrong : sendingFunds"}');
        
    }

    // to kick an user..
    function foldUser(string memory _reason, address _Address) public onlyServer returns(string memory){
        for(uint i=0;i<6;i++){
            if(Users[i].userAddress == _Address){
                Users[i].isFolded = true;
                emit UserFoldedWithReason(1,block.timestamp, roomAddress, _Address, _reason);
                userCount--;
                gameStateUpdate();
                if(expectedUserAddress == _Address){
                    //meaning update change....
                    setNextUserThatIsToBeExpected();// meaning if the current user is the one that was folded by the server

                }
                return '{"status" : 200, "message" : "user folded"}';
            }
        }
        require(false, '{"errorCode" : 404, "message" : "no such user exists" }');
        return '{"status" : 500, "message" : "Something went very wrong : foldingAUser"}';
    }


    function raiseBet(uint256 raiseTo) payable public expectedUser{

        require(raiseTo >currentBet,'{"statusCode": 403, "message": "updated bet cant be less than the previous one"');
        require(raiseTo >currentBet,'{"statusCode": 403, "message": "this is a controlled rese game cant raise more than tha double of current bet."');
        require(msg.value >=raiseTo,'{"statusCode": 422, "message": "message Value insufficient"');

        //adding amount to the pot and stuff.
        pooledAmount += msg.value;
        currentBet = raiseTo;

        //set enxt person in the move, with given address.
        gameStateUpdate();
        setNextUserThatIsToBeExpected();

        emit betRaised(2 , block.timestamp , roomAddress, msg.sender, raiseTo, pooledAmount, expectedUserAddress);

    }
    function callBet()  payable public expectedUser{
        require(msg.value >=currentBet,'{"statusCode": 422, "message": "message Value insufficient"');

        //adding amount to the pot and stuff.
        pooledAmount += msg.value;

        //set next person in the move, with given address.
        gameStateUpdate();
        setNextUserThatIsToBeExpected();
        
        emit betCalled(2 , block.timestamp , roomAddress , msg.sender , pooledAmount , expectedUserAddress);

    }
    function fold() public expectedUser{
        for(uint i=0;i<6;i++){
            if(Users[i].userAddress == msg.sender){
                Users[i].isFolded = true;
                emit UserFoldedWithReason(1,block.timestamp, roomAddress, msg.sender, "User folds himself.");
                userCount--;
                break;
            }
        }  
        gameStateUpdate();
        setNextUserThatIsToBeExpected(); 
    }




    //internal functions

    //set the next user in the sequence of game.
    //condition be the no of users be greater than equal to 2. 
    function setNextUserThatIsToBeExpected() private {
        //if the game is in ended state then jus skip this part
        require(expectedUserAddress != address(0),'{"statusCode": 400, "message": "dealer is not set yet"');
        require(userCount>=2,'{"statusCode": 500, "message": "Something Went Very Wrong : settingNextUser"');
        address curr = expectedUserAddress;
        uint currentIndex;
        uint checkUserCount=0;
        for( uint i=0;i<6;i++){
            if(!Users[i].isFolded){
                checkUserCount++;
            }
            if(Users[i].userAddress == curr){
                currentIndex = i;
            }
        }
        
        //checking ingame consistency..
        require(checkUserCount == userCount,'{"statusCode": 500, "message": "Something Went Very Wrong : usersNOtEqualsTheCount"');

        address nextUser = expectedUserAddress;
        while(nextUser == expectedUserAddress){
            if(!Users[currentIndex+1%6].isFolded){
                nextUser = Users[currentIndex+1%6].userAddress;
                break;
            }
            currentIndex++;
        }
        //this will make sure that the user a next user is seted independent of current index given when 2 users are present.
        // setting the user..
        expectedUserAddress = nextUser;
    }
    
    function shuffleDeck() public onlyServer {

        // Use the random number to select a random value of 'a'
        uint256 aIndex = GENERATEDRANDOMNUMBER % 22;//generateed the value of aIndex.
        uint256 a = coPrimesOf52[aIndex];
        uint256 b = (((GENERATEDRANDOMNUMBER % 100000000) / (GENERATEDRANDOMNUMBER % 1000)) % 51) +1; //  b cant be zero.
        for (uint256 i = 0; i < 17; i++) {
            uint256 index = (a * i + b) % 52;
            gameDeck[i] = initialDeck[index];
        }
        emit deckPost(4 , block.timestamp , roomAddress , GAMENONCE , gameDeck);
               
    }

    function gameStateUpdate() private {
       
        if(userCount == 1){
            stateDefiner = GameState.ENDED;
            emit StateDiscloser(6, block.timestamp , stateDefiner);
            //TODO: concluding statements here...
            return;
        }
        
        //find if this the this expected was the last standing on in the array...
        for(uint8 i=5 ;i>=0 ;i--){
            if(!Users[i].isFolded){
                if(Users[i].userAddress != expectedUserAddress){
                    return;
                }
            }
        }
        
        if(stateDefiner == GameState.FIRSTLOOP){
            stateDefiner = GameState.SECONDLOOP;
            emit StateDiscloser(6, block.timestamp , stateDefiner);
            return;            
        }
        else if(stateDefiner == GameState.SECONDLOOP){
            stateDefiner = GameState.THIRDLOOP;
            emit StateDiscloser(6, block.timestamp , stateDefiner);
            return;            
        }
        else if(stateDefiner == GameState.THIRDLOOP){
            stateDefiner = GameState.ENDED;
            emit StateDiscloser(6, block.timestamp , stateDefiner);
            //TODO: concluding statements here...

            return;            
        }
    }







}