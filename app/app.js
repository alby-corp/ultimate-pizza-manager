import {Route, Router} from './router';
import {HttpClient, ResourceService, ModalService, AuthenticationService} from './services';
import {OrdersController, NotFoundController, MenuController, InfoController, FormController, CreatorController, SignedInController} from './controllers';

const Controller = (function () {

    const privateProps = new WeakMap();

    return class Controller {

        constructor(controller, services) {

            privateProps.set(this, {
                instance: new controller(services)
            });
        }

        get instance() {
            return privateProps.get(this).instance;
        };

    }

})();

export const App = (function () {

    const client = new HttpClient(window.location.origin);

    let _resourceService;
    let _alertService;
    let _authenticationService;

    const initServices = () => {

        _resourceService = new ResourceService(client);
        _alertService = new ModalService($('#alert-serivice'), 'alert-service-modal');

        _authenticationService = new AuthenticationService();
    };

    const initNamespace = (routerInstance) => {
        if (window.AlbyJs === undefined) {
            window.AlbyJs = {};
        }

        AlbyJs.Router = routerInstance;
        AlbyJs.Authentication = _authenticationService;

        AlbyJs.trigger = (target, name,  data) => target.dispatchEvent(new CustomEvent(name, {
            bubbles:true,
            detail: data
        }));
    };

    const initAuthentication = async () => {

        const display = $("#login");

        if (await AlbyJs.Authentication.tryLoadUser()) {
            display.text(AlbyJs.Authentication.user);
        } else {
            display.html(` <span onclick="AlbyJs.Authentication.signin()" class="nav-link">Login</span>`);
        }
    };

    return class App {

        static async init() {

            // Services

            initServices();

            const services = [_resourceService, _alertService];

            // Components

            const formCtrl = new Controller(FormController, services);
            const menuCtrl = new Controller(MenuController, services);
            const infoCtrl = new Controller(InfoController, services);
            const ordersCtrl = new Controller(OrdersController, services);
            const creatorCtrl = new Controller(CreatorController, services);
            const notFoundCtrl = new Controller(NotFoundController);

            // Routes

            const outlet = $('#container');

            const routes = new Map()
                .set("/", new Route(formCtrl, outlet))
                .set("/menu", new Route(menuCtrl, outlet))
                .set("/info", new Route(infoCtrl, outlet))
                .set("/week-orders", new Route(ordersCtrl, outlet))
                .set('/crea-la-tua-pizza', new Route(creatorCtrl, outlet))
                .set('/not-found', new Route(notFoundCtrl, outlet))

            // Namespace
            initNamespace(new Router(routes));

            // Authentication
            await initAuthentication();
        }
    };

})();

