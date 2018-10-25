import {NavigationPipe, RouterPipe} from "./pipes";

export const Router = (function () {

    const privateProps = new WeakMap();

    class Router {

        constructor(routes, container) {
            privateProps.set(this, {
                routes: routes,

                container: container,

                currentUri: '',
                nextUri: undefined,

                activatedRoutes: []
            });
        }

        get routes() {
            return privateProps.get(this).routes;
        }

        get container() {
            return privateProps.get(this).container;
        }

        get currentUri() {
            return privateProps.get(this).currentUri;
        }

        navigate(uri) {

            privateProps.get(this).nextUri = uri ? uri.replace(/^\//, "") : '';

            new NavigationPipe(privateProps.get(this)).runSync();
        }
    }

    return class {

        constructor(routes, container) {

            const router = new Router(routes, container);

            new RouterPipe(router).runSync();

            window.addEventListener('popstate', function(event) {
                router.navigate(window.location.pathname + window.location.search);
            });

            router.navigate(window.location.pathname + window.location.search);
        }
    };
})
();
