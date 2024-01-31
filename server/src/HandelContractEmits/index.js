const UserFoldedWithReason = async (data) => {
    //folding the user whith the given addres....
    


}
const betRaised = async (data) => {

}
const betCalled = async (data) => {

}
const deckPost = async (data) => {
    
}
const pKeyExposed = async (data) => {

}
const StateDiscloser = async (data) => {
    
}
const RandomNumberGenerated = async (data) => {

}
const WithdrawalRequested = async (data) => {
    
}

/*
    event UserFoldedWithReason(uint8 emitCode , uint256 indexed createdOn , address indexed createdBy,  uint256 indexed nonce, address foldAddress, string reason);
    event betRaised(uint8 emitCode , uint256 indexed createdOn , address indexed createdBy , uint256 indexed nonce, address raisersAddress, uint256 raisedTo, uint256 currentPot, address nextUser);
    event betCalled(uint8 emitCode , uint256 indexed createdOn , address indexed createdBy , uint256 indexed nonce, address callerAddress, uint256 currentPot, address nextUser);
    event deckPost(uint8 emitCode , uint256 indexed createdOn , address indexed createdBy , uint256 indexed nonce , string[] cards17);
    event pKeyExposed(uint8 emitCode , uint256 indexed createdOn , address indexed createdBy , uint256 indexed nonce , string privateKey);
    event StateDiscloser(uint8 emitCode , uint256 indexed createdOn , uint256 indexed nonce, GameState stateTransitationTo);
    event RandomNumberGenerated(uint8 emitCode , uint256 indexed createdOn ,address indexed createdBy ,  uint256 indexed nonce , uint256 randomNumber );
    event WithdrawalRequested(uint8 emitCode , address indexed createdBy, address indexed airnode, address indexed sponsorWallet);
*/




export { betRaised, UserFoldedWithReason, betCalled, deckPost, pKeyExposed, StateDiscloser, WithdrawalRequested, RandomNumberGenerated };