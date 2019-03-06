import socketIO from 'socket.io';

import { aesEncrypt } from './services/encryption.service';
import { aesDecrypt } from './services/decryption.service';

import * as sharedConstants from './shares/constants';

export default function (server) {
    const io = socketIO(server);

    io.on('connection', socket => {
        console.log('A client connect to server');

        socket.on(sharedConstants.CLIENT_SENDS_ENCRYPTION_SIGNAL, ({ plaintext, key, algorithm, options }) => {
            switch (algorithm) {
                case 'rsa':
                    throw Error("Algorithm not supported!");
                    break;
                
                case 'camellia':
                    throw Error("Algorithm not supported!");
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
                    throw Error("Algorithm not supported!");
                    break;

                case 'camellia':
                    throw Error("Algorithm not supported!");
                    break;

                case 'aes':
                    aesDecrypt(plaintext, key, socket, options);
                    break;

                default: // Default case is for aes-192-cbc
                    aesDecrypt(plaintext, key, socket, options);
            }
        });
    });
};