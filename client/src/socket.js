import Socket from 'socket.io-client';

import { SOCKET_PATH } from './configs/socket.config';

export default (function () {
    let instance;

    function getInstance() {
        if (!instance) instance = Socket(SOCKET_PATH);
        return instance;
    }

    function removeInstance() {
        if (instance) instance = undefined;
    }

    return { getInstance, removeInstance };
})();