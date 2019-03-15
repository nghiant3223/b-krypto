import socketIO from 'socket.io';

import { aesEncrypt, rsaEncrypt, camelliaEncrypt, aesFolderEncrypt, camelliaFolderEncrypt, rsaFolderEncrypt } from './services/encryption.service';
import { aesDecrypt, rsaDecrypt, camelliaDecrypt, aesFolderDecrypt, camelliaFolderDecrypt, rsaFolderDecrypt } from './services/decryption.service';

import * as sharedConstants from './shares/constants';

export default function (server) {
    const io = socketIO(server);

    io.on('connection', socket => {
        console.log('A client connect to server');

        socket.on(sharedConstants.CLIENT_SENDS_ENCRYPTION_SIGNAL, ({ plaintext, key, algorithm, options }) => {
            switch (algorithm) {
                case 'rsa':
                    // throw Error("Algorithm not supported!");
                    rsaEncrypt(plaintext, key, socket, options);
                    break;
                
                case 'camellia':
                    camelliaEncrypt(plaintext, key, socket, options);
                    break;
                
                case 'aes':
                    aesEncrypt(plaintext, key, socket, options);
                    break;
                    
                default: // Default case is for aes-192-cbc
                    aesEncrypt(plaintext, key, socket, options);
            }
        });

        socket.on(sharedConstants.CLIENT_SENDS_DECRYPTION_SIGNAL, ({ plaintext, key, algorithm, options }) => {
            switch (algorithm) {
                case 'rsa':
                    // throw Error("Algorithm not supported!");
                    rsaDecrypt(plaintext, key, socket, options);
                    break;

                case 'camellia':
                    camelliaDecrypt(plaintext, key, socket, options);
                    break;

                case 'aes':
                    aesDecrypt(plaintext, key, socket, options);
                    break;

                default: // Default case is for aes-192-cbc
                    aesDecrypt(plaintext, key, socket, options);
            }
        });

        socket.on(sharedConstants.CLIENT_SENDS_FOLDER_ENCRYPTION_SIGNAL, ({ plaintext, key, algorithm, options }) => {
            switch (algorithm) {
                case 'rsa':
                    rsaFolderEncrypt(plaintext, key, socket, options)
                    break;

                case 'camellia':
                    camelliaFolderEncrypt(plaintext, key, socket, options);
                    break;

                case 'aes':
                    aesFolderEncrypt(plaintext, key, socket, options);
                    break;

                default: // Default case is for aes-192-cbc
                    aesFolderEncrypt(plaintext, key, socket, options);
            }
        });

        socket.on(sharedConstants.CLIENT_SENDS_FOLDER_DECRYPTION_SIGNAL, ({ plaintext, key, algorithm, options }) => {
            switch (algorithm) {
                case 'rsa':
                    rsaFolderDecrypt(plaintext, key, socket, options)
                    break;

                case 'camellia':
                    camelliaFolderDecrypt(plaintext, key, socket, options);
                    break;

                case 'aes':
                    aesFolderDecrypt(plaintext, key, socket, options);
                    break;

                default: // Default case is for aes-192-cbc
                    aesFolderDecrypt(plaintext, key, socket, options);
            }
        });
    });
};