export const Route = (function () {

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

export const Router = (function () {

    const privateProps = new WeakMap();

    const manage = async function () {
        let key = window.location.pathname;

        const routes = privateProps.get(this).routes;

        if (!routes.has(key)) {
            key = '/not-found';
            history.pushState({url: window.location.href}, '404 - Not Found', key);
        }

        const route = routes.get(key);

        const view = route.controller.instance.template;

        route.outlet(view);
        route.controller.instance.execute();
    };

    const init = (self) => {
        window.addEventListener("popstate", manage.bind(self));
        manage.call(self);
    };

    return class {
        constructor(routes) {

            privateProps.set(this, {
                routes: routes
            });

            init(this);
        }

        link(uri) {

            let key = window.location.pathname;

            if(`/${uri}` === key)
            {
                return;
            }

            history.pushState(null, null, uri);
            manage.call(this);
        }
    };

})();







