const HttpClient = (function () {

    const headers = {headers: {'Content-Type': 'application/json'}};

    const privateProps = new WeakMap();

    class HttpClient {

        constructor(url) {
            privateProps.set(this, {
                url: url
            });
        }

        get(uri) {
            $.ajaxSetup(headers);
            return $.get(`${ privateProps.get(this).url}/${uri}`) || [];
        }

        getById(uri, id) {
            return $.get(`${privateProps.get(this).url}${uri}?id=${id}`) || {};
        }

        post(uri, body) {
            $.ajaxSetup(headers);
            return $.post(`${ privateProps.get(this).url}/${uri}`, JSON.stringify(body));
        }
    }

    return HttpClient;
})();