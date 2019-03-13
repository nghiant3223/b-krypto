const { generateKeyPairSync, publicEncrypt, privateDecrypt } = require('crypto');
const fs = require('fs');

const publicKey = fs.readFileSync('./publickey.pem');
const privateKey = fs.readFileSync('./privatekey.pem');

// print out the generated keys
console.log(`PublicKey: ${publicKey}`);
console.log(`PrivateKey: ${privateKey}`);

// message to be encrypted
const toEncrypt = "This is a test!";
const encryptBuffer = Buffer.from(toEncrypt);

// encrypt using public key
const encrypted = publicEncrypt(publicKey,encryptBuffer);

// print out the text and cyphertext
console.log("Text to be encrypted:");
console.log(toEncrypt);
console.log("cipherText:");
console.log(encrypted.toString());

// decrypt the cyphertext using the private key
const decryptBuffer = Buffer.from(encrypted.toString("base64"), "base64");
const decrypted = privateDecrypt(privateKey,decryptBuffer);

// print out the decrypted text
console.log("decripted Text:");
console.log(decrypted.toString());