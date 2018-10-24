import {AlbyGuard} from "../core";


export const AuthGuard = (function () {

    const canActivate = (authService) => async () => {

        const user = await authService.user;

        return user !== undefined;
    };

    const callback = () => AlbyJs.Router.navigate('login-requested?returnUrl=' + AlbyJs.Router.currentUri());

    return class extends AlbyGuard {

        constructor(authService) {

            super(canActivate(authService), callback);
        };
    };
})();
