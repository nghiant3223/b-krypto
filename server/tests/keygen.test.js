const { generateKeyPairSync } = require('crypto');
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 4096,  // the length of your key in bits
  publicKeyEncoding: {
    type: 'spki',       // recommended to be 'spki' by the Node.js docs
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',      // recommended to be 'pkcs8' by the Node.js docs
    format: 'pem',
    cipher: 'aes-256-cbc',   // *optional*
    passphrase: 'top secret' // *optional*
  }
});

console.log(publicKey);
console.log(privateKey);