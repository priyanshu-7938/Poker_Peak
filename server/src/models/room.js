import mongoose from "mongoose";
import crypto from "crypto";
import User from "./user.js";
import { getARandomDeck, decryptWithPrivateKey, encryptWithPublicKey } from "../utils/cardDeck";

const roomSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: ['resting','firstloop','secondloop','thirdloop','ended'],
            default: 'resting'      
        },
        users: [
            {
                id:{
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
                isFolded: {
                    type: Boolean,
                    default: false,
                }
            }
        ],
        pooledAmount: {
            type: Number,
            default: 0,
        },
        publicKey: {
            type: String,
        },
        privateKey: {
            type: String,
        },
        encryptedGameDeck: {
            type: [String],
        },
        encryptedDeck: {
            type: [String],
        },
        randomNumberGenerated: {
            type: Boolean,
            
        },
        
    },
    {
        timestamps: true
    }
);

// instance method to encode the cards with the public key
roomSchema.methods.getFirst3Cards = function() {
    if(this.status == 'firstloop' || this.status == 'secondloop' || this.stauts == 'thirdloop'){
        return decryptWithPrivateKey( this.encryptedGameDeck, this.privateKey).slice(-5).slice(0,3);
    }
};

roomSchema.methods.getFirst4Cards = function() {
    if( this.status == 'secondloop' || this.stauts == 'thirdloop'){
        return decryptWithPrivateKey( this.encryptedGameDeck, this.privateKey).slice(-5).slice(0,4);
    }
};

roomSchema.methods.getFirst5Cards = function() {
    if( this.stauts == 'thirdloop' || this.status == 'ended' ){
        return decryptWithPrivateKey( this.encryptedGameDeck, this.privateKey).slice(-5);
    }
};

roomSchema.methods.getUserCardsVisId = function(_id) {
    const user = User.findById(_id);
    
}
roomSchema.methods.decodeCards = function() {
  // your decoding logic here
};

// instance method to add a user to the room
roomSchema.methods.addUser = function(userId) {
  // your logic to add a user to the room here
};

// instance method to remove a user from the room
roomSchema.methods.removeUser = function(userId) {
  // your logic to remove a user from the room here
};

roomSchema.pre('validate', function(next) {
    if (!this.isNew) {
      return next();
    }
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 1024,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
        },
    });
    
    this.publicKey = privateKey;
    this.privateKey = publicKey;
    //fetching a deck
    const randomDeck = getARandomDeck();
    
    this.encryptedDeck = randomDeck.map((element,index) => encryptWithPublicKey(element, this.publicKey));
    next();
  });


const Room = mongoose.model('Room', roomSchema);

export default Room;