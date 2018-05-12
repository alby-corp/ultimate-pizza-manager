// Navigation
const Router = (function () {

    const getUri = () => window.location.pathname;

    const privateProps = new WeakMap();

    class Route {
        constructor(controller, view, outlet) {
            privateProps.set(this, {
                controller: controller,
                view: view,
                outlet: outlet
            });
        }

        get controller() {
            return privateProps.get(this).controller;
        }

        get view() {
            return privateProps.get(this).view;
        }

        get outlet() {
            return privateProps.get(this).outlet;
        }
    }

    class RoutesManager {
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

            ctrl.outlet(ctrl.view);
            ctrl.controller.execute();
        }
    }

    const routeBuilder = function (httpClient, routes) {
        const buildedRoutes = new Map();

        let ctrl;
        for (let key of routes.keys()) {

            const entity = routes.get(key);

            try {
                ctrl = new Route(new entity.controller(entity.services), httpClient.get(entity.controller.view), entity.outlet);
                buildedRoutes.set(key, ctrl);
            } catch (error) {
                console.log('Cannot instantiate controller!');
            }
        }

        return buildedRoutes;

    };

    const init = (func) => {
        window.addEventListener("onpopstate", () => func());
        func();
    };

    class Router {
        constructor(httpClient, routes) {

            privateProps.set(this, {
                handler: new RoutesManager(routeBuilder(httpClient, routes))
            });

            init(privateProps.get(this).handler.manage);
        }

        link(uri) {
            history.pushState(null, null, uri);
            privateProps.get(this).handler.manage();
        }
    }

    return Router;

})();







