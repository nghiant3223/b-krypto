import socketIO from 'socket.io';

import { encrypt } from './services/encryption.service';
import { decrypt } from './services/decryption.service';

import * as sharedConstants from './shares/constants';

export default function (server) {
    const io = socketIO(server);

    io.on('connection', socket => {
        console.log('A client connect to server');

        socket.on(sharedConstants.CLIENT_SENDS_ENCRYPTION_SIGNAL, ({ plaintext, key, algorithm }) => {
            encrypt(plaintext, key, algorithm, socket);
        });

        socket.on(sharedConstants.CLIENT_SENDS_DECRYPTION_SIGNAL, ({ plaintext, key, algorithm }) => {
            decrypt(plaintext, key, algorithm, socket);
        });
    });
};