export const HttpClient = (function () {

    const setHeaders = (token) => {
        return {headers: {'Content-Type': 'application/json', 'Authorization': `bearer ${token}`}}
    };

    const privateProps = new WeakMap();

    return class {

        constructor(url) {
            privateProps.set(this, {
                url: url
            });

            this.get = uri => token => {
                $.ajaxSetup(setHeaders(token));
                return $.get(`${ privateProps.get(this).url}/${uri}`) || [];
            };

            this.post = (uri, body) => token => {
                $.ajaxSetup(setHeaders(token));
                return $.post(`${ privateProps.get(this).url}/${uri}`, JSON.stringify(body));
            }
        }
    };

})();