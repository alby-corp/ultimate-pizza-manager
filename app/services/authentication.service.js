import * as AuthenticationContext from 'adal-angular';

export const AuthenticationService = (function () {

    const privateProps = new WeakMap();

    const config = {
        instance: 'instance',
        tenant: 'tenant',
        clientId: 'clientId',
        postLogoutRedirectUri: window.location.origin,
        cacheLocation: 'localStorage',
        redirectUri: 'redirectUri'
    };

    return class {

        get user() {
            return privateProps.get(this).user;
        };

        constructor() {
            privateProps.set(this, {
                authContext: new AuthenticationContext(config),
                user: undefined
            });
        }

        async tryLoadUser() {
            // await privateProps.get(this).authContext.clearStaleState();

            const user = await privateProps.get(this).authContext.getCachedUser();

            if (user && !user.expired) {
                privateProps.get(this).user = user;
                return true;
            }

            privateProps.get(this).user = undefined;
            return false;
        };

        async signin() {

            const user = await privateProps.get(this).authContext.login({
                state: window.location.href
            });
        }

        async completeSignin() {
            await privateProps.get(this).authContext.handleWindowCallback();

            return this.tryLoadUser();
        }

        signout() {

        }

    };

})();