// Navigation
const Router = (function () {

    const getUri = () => window.location.pathname;

    const privateProps = new WeakMap();

    class RoutesHandler {
        constructor(routes) {
            privateProps.set(this, {
                routes: routes
            });

        }

        manage() {

            let uri = getUri();

            if (!privateProps.get(this).routes.has(uri)) {
                history.pushState({url: window.location.href}, '404 - Not Found', 'not-found');
            }

            const ctrl = privateProps.get(this).routes.get(getUri());
            ctrl.initView().populate();

        };
    }

    class Router {
        constructor(routes) {
            privateProps.set(this, {
                handler: new RoutesHandler(routes)
            });

            window.addEventListener("onpopstate", () => privateProps.get(this).handler.manage());

            privateProps.get(this).handler.manage();
        }

        link(uri) {

            history.pushState(null, uri, uri);
            privateProps.get(this).handler.manage();
        }
    }

    return Router;

})();







