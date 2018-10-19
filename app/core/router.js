import {AuthService} from "../services";

export const Router = (function () {

    const privateProps = new WeakMap();

    async function navigate() {

        const uri = window.location.pathname.replace(/^\//, "");
        this.currentUri = uri || '/';

        let routes = privateProps.get(this).configuration.routes.filter(r => r.path === uri);

        if (routes.length === 0) {
            routes = privateProps.get(this).configuration.routes.filter(r => `${r.path}` === '**');
        }

        for (let route of routes) {
            for (let guard of route.canActivate) {

                const canActivate = await new guard(privateProps.get(this).configuration.container.get(AuthService)).canActivate();

                if (!canActivate) {
                    return;
                }
            }
        }

        for (let route of routes) {

            const outlet = document.getElementsByTagName(route.outlet);

            if (outlet.length > 1) {
                throw new Error('Multiple outlets with same name have been detected!')
            }

            try {
                outlet[0].innerHTML = route.component.template;
            } catch (e) {
                throw new Error(`Cannot find outlet: ${e}`);
            }

            const component = privateProps.get(this).configuration.container.get(route.component);

            if (!!component.execute) {
                await component.execute();
            }
        }
    }

    function registerNavigationServices() {

        if (window.AlbyJs === undefined) {
            const router = this;
            window.AlbyJs = {
                Router: {
                    get currentUri(){
                        return router.currentUri;
                    }
                },
                trigger: (target, name,  data) => target.dispatchEvent(new CustomEvent(name, {
                    bubbles:true,
                    detail: data
                }))
            };
        }

        AlbyJs.Router.navigate = this.navigate.bind(this);
    }

    const Router = class {
        constructor(configuration) {

            privateProps.set(this, {
                configuration: configuration
            });

            registerNavigationServices.call(this);
        }

        navigate(uri) {

            if (!!uri) {
                let key = window.location.pathname;
                if (`/${uri}` !== key) {
                    history.pushState(null, null, uri);
                }
            }

            navigate.call(this);
        }
    };

    return class {

        static async build(config) {
            const router = new Router(config);

            await router.navigate();

            return router;
        }


    };

})();







