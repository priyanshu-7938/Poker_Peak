import Room from "../models/room.js";


const UserFoldedWithReason = async (data, io) => {
    //folding the user whith the given addres
    //the user is to be folded.... via address...
    const room = await Room.findByAddressValue(data.transaction.address);
    await room.foldUserByAddress(data.data.foldAddress);
    
    io.emit("UserFoldedWithReason",{
        reason: data.data.reason,
        addressToFOld: data.data.foldAddress,
        users: room.users,
    });
    //deleting the user from the db..
}
const betRaised = async (data, io) => {
// createdBy , uint256 indexed nonce, address raisersAddress, uint256 raisedTo, uint256 currentPot, address nextUser)
    const room = await Room.findByAddressValue(data.transaction.address);
    await room.updatePooledAmounnt(data.data.currentPot);

    io.emit("betRaised",{
        currentBet:data.data.raisedTo,
        currentPool:data.data.currentPot,
        expectedUser: data.data.nextUser,
        raisedByAddress:raiserAddress,
    })
}
const betCalled = async (data, io) => {
    //emitCode , uint256 indexed createdOn , address indexed createdBy , uint256 indexed nonce, address callerAddress, uint256 currentPot, address nextUser
    const room = await Room.findByAddressValue(data.transaction.address);
    await room.updatePooledAmounnt(data.data.currentPot);

    io.emit("betRaised",{
        currentBet:data.data.raisedTo,
        currentPool:data.data.currentPot,
        expectedUser: data.data.nextUser,
        raisedByAddress:raiserAddress,
    })

}
const deckPost = async (data, io) => {
    
}
const pKeyExposed = async (data, io) => {

}
const StateDiscloser = async (data, io) => {
    
}
const RandomNumberGenerated = async (data, io) => {

}
const WithdrawalRequested = async (data, io) => {
    
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