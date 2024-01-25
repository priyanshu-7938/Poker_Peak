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
export {
    CARDDECK,
    getARandomDeck,
    decryptWithPrivateKey,
    encryptWithPublicKey
    
}