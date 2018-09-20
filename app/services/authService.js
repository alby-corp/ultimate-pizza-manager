import * as AuthContext from 'adal-angular';

export const AuthService = (function () {

    const privateProps = new WeakMap();

    const config = {
        instance: 'instance',
        tenant: 'tenant',
        clientId: 'clientId',
        postLogoutRedirectUri: window.location.origin,
        cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
        redirectUri: 'redirectUri'
    };

    const acquireToken = (self, clientId) => {
        const promise = new Promise((resolve, reject) => {
            privateProps.get(self).authContext.acquireToken(clientId, (error, token) => {
                if (error !== undefined) {
                    resolve(token)
                } else {
                    reject(error);
                }
            })
        });

        return promise;
    };

    return class {

        constructor() {
            privateProps.set(this, {
                authContext: new AuthContext(config)
            });

            this.user = () => {
                const user = privateProps.get(this).authContext.getCachedUser();

                if (user && !user.expired) {
                    return user;
                }
                return undefined;
            };

            this.signin = () => {

                privateProps.get(this).authContext.login({
                    state: window.location.href
                });
            };

            this.completeSignin = () => {
                privateProps.get(this).authContext.handleWindowCallback();

                return this.user;
            };

            this.signout = () => {
                privateProps.get(this).authContext.logOut();
            }
        }

        async interceptor(callback) {
            const token = await acquireToken(this, config.clientId);
            return await callback(token);
        }
    };

})();