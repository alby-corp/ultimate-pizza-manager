const Ajax = (function () {

    const url = window.location.href;

    class Ajax {

        static get(uri) {
            return $.get(`${url}${uri}`) || [];
        }

        static getById(uri, id) {
            return $.get(`${url}${uri}?id=${id}`) || {};
        }
    }

    return Ajax;
})();