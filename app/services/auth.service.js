import * as AuthContext from 'adal-angular';
import config from '../settings';

export const AuthService = (function () {

    const privateProps = new WeakMap();

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
                authContext: new AuthContext(config["azure-ad-prod-config"])
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
            };

            this.signout = () => {
                privateProps.get(this).authContext.logOut();
            }
        }

        async interceptor(callback) {
            const token = await acquireToken(this, config["azure-ad-prod-config"].clientId);
            return await callback(token);
        }
    };

})();