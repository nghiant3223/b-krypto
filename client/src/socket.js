import Socket from 'socket.io-client';
export default (function () {
    let instance;

    function getInstance() {
        if (!instance) instance = Socket('/');
        return instance;
    }

    function removeInstance() {
        if (instance) instance = undefined;
    }

    return { getInstance, removeInstance };
})();