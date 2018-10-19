export const AuthGuard = (function () {
    const privateProps = new WeakMap();

    return class {
        constructor(authService) {
            privateProps.set(this, {
                authService: authService
            });
        };

        async canActivate() {

            const isAuthenticated = await privateProps.get(this).authService.user !== undefined;

            if(!isAuthenticated) {
                AlbyJs.Router.navigate.call(this, 'login-requested?returnUrl=' + AlbyJs.Router.currentUri);
            }

            return isAuthenticated;
        }
    };
})();
