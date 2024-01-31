import mongoose from "mongoose";
import crypto from "crypto";
import User from "./user.js";
import { getARandomDeck, decryptWithPrivateKey, encryptWithPublicKey, GenrateSopnecerWallet } from "../utils/cardDeck.js";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

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
                    type: mongoose.Schema.Types.ObjectId,
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
        memberCount: {
            type: Number,
            default: 0,
        },
        contrctAddress: {
            type: String,
            unique: true,
            required: [true, 'must have a contract Address'],
        },
        sponcerAddress: {
            type: String,
            unique: true,
        }
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

userSchema.statics.findByAddressValue = async (contrctAddress) => {
    const user = await Room.findOne({ contrctAddress });
    if (!user) {
        return undefined;
    }
    return user;
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

roomSchema.methods.getUserCardsVisId = function(userId) {
    const room = Room.findById(_id);
    const users = room.users;


    
}
roomSchema.methods.decodeCards = function() {
    // your decoding logic here
};

// instance method to add a user to the room
roomSchema.methods.addUser = async function(userId) {
    const room = this;
    const users = this.users;
    users.forEach((item)=>{
        if(item.id == userId){
            // user allready existsSync...
        }
    })
    for(var el in users){
        if(el?.id == userId){
            return false;
        }
    }
    //else the user is not present..
    users.push({id:userId,isFolded:false});
    await room.save({validateBeforeSave:false});
    return users;
};
// instance method to remove a user from the room
roomSchema.methods.removeUser = async function(userId) {
    const room = this;
    const afterUsers = this.users.filter((item)=>item.id!=userId);
    this.users = afterUsers;
    await room.save({validateBeforeSave:false});
    return this.users;
    //this is cpoied from the above function so if this contains error check above one too.
};

roomSchema.methods.initGame = function() {
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
}

roomSchema.pre('validate', function(next) {
    if (!this.isNew) {
        return next();
    }
    // const _sponcerAddress = GenrateSopnecerWallet(this.contrctAddress);
    // this.sponcerAddress = _sponcerAddress;
    // //creating command to fetch the sponcer wallet....
    // console.log("in the per fxn.");
    //allready sending the sponcer wallet together....
    
    next();
});

roomSchema.pre('save', async function (next) {
    next();
});


const Room = mongoose.model('Room', roomSchema);

export default Room;