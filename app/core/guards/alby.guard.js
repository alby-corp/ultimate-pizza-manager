import {UnauthorizedRouteError} from "../errors";

export const AlbyGuard = (function () {

    const privateProps = new WeakMap();

    return class {

        constructor(canActivated, callback) {

            privateProps.set(this, {
                canActivated: canActivated,
                callback: callback
            });
        }

        async canActivated() {

            const isAuthenticated = await privateProps.get(this).canActivated();

            if (!isAuthenticated) {
                throw new UnauthorizedRouteError(privateProps.get(this).callback);
            }
        }
    }
})();
