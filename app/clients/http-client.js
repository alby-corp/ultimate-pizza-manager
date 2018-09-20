export const HttpClient = (function () {

    const headers = (token) => {
        return {headers: {'Content-Type': 'application/json', 'Authorization': `bearer ${token}`}}
    };

    const privateProps = new WeakMap();

    return class {

        constructor(url) {
            privateProps.set(this, {
                url: url
            });

            this.get = uri => token => {
                $.ajaxSetup(headers(token));
                return $.get(`${ privateProps.get(this).url}/${uri}`) || [];
            };

            this.getById = (uri, id) => token => {
                $.ajaxSetup(headers(token));
                return $.get(`${privateProps.get(this).url}${uri}?id=${id}`) || {};
            };

            this.post = (uri, body) => token => {
                $.ajaxSetup(headers(token));
                return $.post(`${ privateProps.get(this).url}/${uri}`, JSON.stringify(body));
            }
        }
    };

})();