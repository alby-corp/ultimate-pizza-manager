export const AuthClient = (function () {

    const privateProps = new WeakMap();

    return class {

        constructor(httpClient, authService) {
            privateProps.set(this, {
                httpClient: httpClient,
                authService: authService
            });

            this.get = (url) => privateProps.get(this).authService.interceptor(privateProps.get(this).httpClient.get(url));

            this.post = (url, body) => privateProps.get(this).authService.interceptor(privateProps.get(this).httpClient.post(url, body));
        }
    }
})();