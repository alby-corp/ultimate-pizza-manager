const HttpClient = (function () {

    const privateProps = new WeakMap();

    class HttpClient {

        constructor(url) {
            privateProps.set(this, {
                url: url
            });
        }

        get(uri) {
            return $.get(`${ privateProps.get(this).url}/${uri}`) || [];
        }

        getById(uri, id) {
            return $.get(`${privateProps.get(this).url}${uri}?id=${id}`) || {};
        }

        post(uri, body) {
            return $.post(`${ privateProps.get(this).url}/${uri}`, body);
        }
    }

    return HttpClient;
})();