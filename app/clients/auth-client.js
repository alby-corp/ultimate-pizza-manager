export const AuthClient = (function () {

    const privateProps = new WeakMap();

    return class {

        constructor(httpClient, authService) {
            privateProps.set(this, {
                httpClient: httpClient,
                authService: authService
            });

            this.get = (uri) => privateProps.get(this).authService.interceptor(privateProps.get(this).httpClient.get(uri));

            this.getById = (uri, id) => privateProps.get(this).authService.interceptor(privateProps.get(this).httpClient.getById(uri, id));

            this.post = (uri, body) => privateProps.get(this).authService.interceptor(privateProps.get(this).httpClient.post(uri, body));
        }
    };
})();