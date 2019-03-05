import Socket from 'socket.io-client';

import { SERVER_URL } from './configs/server.config';

export default (function () {
    let instance;

    function getInstance() {
        if (!instance) instance = Socket(SERVER_URL);
        return instance;
    }

    function removeInstance() {
        if (instance) instance = undefined;
    }

    return { getInstance, removeInstance };
})();