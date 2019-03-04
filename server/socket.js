import socketIO from 'socket.io';

import * as sharedConstants from './shares/constants';

export default function (server) {
    const io = socketIO(server);

    io.on('connection', socket => {
        console.log('A client connect to server');

        socket.on(sharedConstants.CLIENT_SENDS_ENCRYPTION_SIGNAL, data => {
        
        });
    });
};