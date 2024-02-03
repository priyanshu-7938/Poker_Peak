import { spawn } from 'child_process';
import dotenv from "dotenv";
import Room from "../models/room.js";
dotenv.config();


import crypto from "crypto";
const CARDDECK =  ["2_s", "2_h", "2_d", "2_c", "3_s", "3_h", "3_d", "3_c", "4_s", "4_h", "4_d", "4_c", "5_s", "5_h", "5_d", "5_c", "6_s", "6_h", "6_d", "6_c", "7_s", "7_h", "7_d", "7_c", "8_s", "8_h", "8_d", "8_c", "9_s", "9_h", "9_d", "9_c", "10_s", "10_h", "10_d", "10_c", "J_s", "J_h", "J_d", "J_c", "Q_s", "Q_h", "Q_d", "Q_c", "K_s", "K_h", "K_d", "K_c", "A_s", "A_h", "A_d", "A_c"];


const getARandomDeck = ()=>{
    const shuffledDeck = CARDDECK.map((item,index)=>{
        const a = 17;
        const buffer = crypto.randomBytes(4);
        const b = ( buffer.readUInt32BE(0) % 51 ) + 1;
        const randomIndex = ((index*a) + b)%52;
        return CARDDECK[randomIndex];
    })
    return shuffledDeck;
}
function encryptWithPublicKey(text, publicKey) {
    const bufferText = Buffer.from(text, 'utf-8');
    const encrypted = crypto.publicEncrypt(publicKey, bufferText);
    return encrypted.toString('base64');
}
function decryptWithPrivateKey(encryptedText, privateKey) {
    const bufferEncrypted = Buffer.from(encryptedText, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, bufferEncrypted);
    return decrypted.toString('utf-8');
}

const GenrateSopnecerWallet = (address) => {
    const airnodeXpub  = 'xpub6CuDdF9zdWTRuGybJPuZUGnU4suZowMmgu15bjFZT2o6PUtk4Lo78KGJUGBobz3pPKRaN9sLxzj21CMe6StP3zUsd8tWEJPgZBesYBMY7Wo';
    const airnodeAddress = '0x6238772544f029ecaBfDED4300f13A3c4FE84E1D';
    const sponsorAddress = address;

    const command = 'npx';
    const args = [
    '@api3/airnode-admin',
    'derive-sponsor-wallet-address',
    '--airnode-xpub', airnodeXpub,
    '--airnode-address', airnodeAddress,
    '--sponsor-address', sponsorAddress,
    ];

    /*
    @api3/airnode-admin derive-sponsor-wallet-address --airnode-xpub xpub6CuDdF9zdWTRuGybJPuZUGnU4suZowMmgu15bjFZT2o6PUtk4Lo78KGJUGBobz3pPKRaN9sLxzj21CMe6StP3zUsd8tWEJPgZBesYBMY7Wo --airnode-address 0x6238772544f029ecaBfDED4300f13A3c4FE84E1D --sponsor-address 0xe40ca8f5Df3c4ee03a8E4f9A35C7f86F4362326c


    */

    const airnodeProcess = spawn(command, args, { stdio: 'inherit' });

    airnodeProcess.on('exit', (code) => {
        if (code === 0) {
            console.log('Command executed successfully.');
            const sponsorWalletAddress = commandOutput.trim();
            return sponsorWalletAddress;    
        } else {
            console.error(`Error: Command exited with code ${code}`);
            return undefined;
        }
    });

    airnodeProcess.on('error', (err) => {
        console.error(`Error: ${err.message}`);
    });
}
const GameInitBaby = async (contractAddress) => {
    //game init baby...
    // processes 
    // upload the users... to the contract then the game starts..
    //TODO :complete this function...




}
const GameResetBaby = async (contractAddress) => {
    //TODO: compplete the function here...
    //make sure to call the randGen to gen the number then resets all the stuff...
    
}

export {
    CARDDECK,
    GameInitBaby,
    GameResetBaby,
    getARandomDeck,
    decryptWithPrivateKey,
    encryptWithPublicKey,
    GenrateSopnecerWallet,
    
}