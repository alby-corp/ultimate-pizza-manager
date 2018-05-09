// Navigation
const Router = (function () {

    const privateProps = new WeakMap();

    class RoutesHandler {
        constructor(routes) {
            privateProps.set(this, {
                routes: routes
            });

        }

        manage() {

            const uri = window.location.pathname;

            const ctrl = privateProps.get(this).routes.get(uri);
            ctrl.initView().populate();
        };
    }

    class Router {
        constructor(routes) {
            privateProps.set(this, {
                handler: new RoutesHandler(routes)
            });

            $(window).on('hashchange', (e) => {
                privateProps.get(this).handler.manage()
            });

            privateProps.get(this).handler.manage();
        }

        link(uri) {

            !uri ? history.pushState() : history.pushState(null, null, uri);

            privateProps.get(this).handler.manage();
        }
    }

    return Router;

})();







