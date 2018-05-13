// Navigation
const Route = (function () {

    const privateProps = new WeakMap();

    return class {
        constructor(controller, outlet) {

            privateProps.set(this, {
                controller: controller,
                outlet: (data) => outlet.empty().html(data)
            });
        }

        get controller() {
            return privateProps.get(this).controller;
        }

        get outlet() {
            return privateProps.get(this).outlet;
        }
    }

})();

const Router = (function () {

    const privateProps = new Map();

    const manage = async () => {
        let key = window.location.pathname;

        const routes = privateProps.get('routes').routes;

        if (!routes.has(key)) {
            history.pushState({url: window.location.href}, '404 - Not Found', 'not-found');
        }

        const route = routes.get(key);

        const view = await route.controller.view;

        route.outlet(view);
        route.controller.instance.execute();
    };

    const init = () => {
        window.addEventListener("onpopstate", manage);
        manage();
    };

    return class {
        constructor(routes) {

            privateProps.set('routes', {
                routes: routes
            });

            init();
        }

        link(uri) {
            history.pushState(null, null, uri);
            manage();
        }
    };

})();







