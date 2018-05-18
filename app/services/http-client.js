export const HttpClient = (function () {

    const headers = {headers: {'Content-Type': 'application/json'}};

    const privateProps = new WeakMap();

    return class {

        constructor(url) {
            privateProps.set(this, {
                url: url
            });

            this.get = (uri) => {
                $.ajaxSetup(headers);
                return $.get(`${ privateProps.get(this).url}/${uri}`) || [];
            };

            this.getById = (uri, id) => {
                $.ajaxSetup(headers);
                return $.get(`${privateProps.get(this).url}${uri}?id=${id}`) || {};
            };

            this.post = (uri, body) => {
                $.ajaxSetup(headers);
                return $.post(`${ privateProps.get(this).url}/${uri}`, JSON.stringify(body));
            }
        }
    };

})();