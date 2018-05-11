const HttpClient = (function () {

    const privateProps = new WeakMap();

    class HttpClient {

        constructor(url) {
            privateProps.set(this, {
                url: url
            });
        }

        async get(uri) {
            return await $.get(`${ privateProps.get(this).url}${uri}`) || [];
        }

        async getById(uri, id) {
            return await $.get(`${privateProps.get(this).url}${uri}?id=${id}`) || {};
        }
    }

    return HttpClient;
})();