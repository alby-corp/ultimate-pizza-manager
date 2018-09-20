export const Router = (function () {

    const privateProps = new WeakMap();

    const route = async function () {
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

    const initEvents = (self) => {
        window.addEventListener("popstate", route.bind(self));
    };

    return class {
        constructor(routes) {

            privateProps.set(this, {
                routes: routes
            });

            initEvents(this);

            route.call(this);
        }

        link(uri) {

            let key = window.location.pathname;

            if (`/${uri}` !== key) {
                history.pushState(null, null, uri);
            }

            route.call(this);
        }
    };

})();







