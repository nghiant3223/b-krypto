import Socket from 'socket.io-client';

<<<<<<< HEAD
=======
import { SERVER_URL } from './configs/server.config';

>>>>>>> 587ee88814bedf6d8fff054765a8d47ba0630799
export default (function () {
    let instance;

    function getInstance() {
<<<<<<< HEAD
        if (!instance) instance = Socket('/');
=======
        if (!instance) instance = Socket(SERVER_URL);
>>>>>>> 587ee88814bedf6d8fff054765a8d47ba0630799
        return instance;
    }

    function removeInstance() {
        if (instance) instance = undefined;
    }

    return { getInstance, removeInstance };
})();