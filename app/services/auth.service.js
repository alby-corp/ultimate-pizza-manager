
export const AuthService = (function () {

    let _userPromise;

    return class {

        constructor(authContextFactory) {
            const _authContext = authContextFactory();

            _userPromise = new Promise((resolve) => {
                    function resolveUser(_, token) {
                        return resolve({
                            token,
                            user: this.getUser()
                        })
                    }

                    const authContext = authContextFactory(resolveUser);

                    authContext.acquireTokenSilent(['openid']).then(function (accessToken) {
                        const user = authContext.getUser();
                        const now = (+new Date() / 1000) | 0;

                        if (user.idToken.exp > now) {
                            resolve({
                                token: accessToken,
                                user
                            });

                        } else {
                            authContext.clearCache();
                            resolve({});
                        }
                    }, _ => resolve({}));
                }
            );

            this.signin = () => {
                _authContext.loginRedirect(['openid'], {
                    state: window.location.href
                });
            };

            this.signout = () => {
                _authContext.logout();
            };
        }

        get user() {
            return _userPromise.then(u => u.user);
        }

        get token() {
            return _userPromise.then(u => u.token);
        }

        async interceptor(callback) {
            return await callback(await this.token);
        }
    }
})();