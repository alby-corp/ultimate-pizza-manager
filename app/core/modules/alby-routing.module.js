import {Route} from "..";

export const AlbyRoutingModule = (function () {

    const privateProps = new WeakMap();

    return class {

        constructor(routes) {

            if (!Array.isArray(routes) || !routes.every(route => route instanceof Route)) {
                throw Error("Routes have to be an Array of Route objects.");
            }

            privateProps.set(this, {
                routes: routes
            });
        }

        get routes() {
            return privateProps.get(this).routes;
        }
    }
})();
