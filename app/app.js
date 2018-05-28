import {Route, Router} from './router';
import {HttpClient, ResourceService, ModalService} from './services';
import {OrdersController, NotFoundController, MenuController, InfoController, FormController} from './controllers';
import {Button} from "./model";

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

    let resourceService;
    let alertService;

    const initServices = () => {

        resourceService = new ResourceService(client);
        alertService = new ModalService($('#alert-serivice'), 'alert-service-modal');
    };

    return class App {

        static async init() {

            initServices();
            const services = [resourceService, alertService];

            const formCtrl = new Controller(FormController, services);
            const menuCtrl = new Controller(MenuController, services);
            const infoCtrl = new Controller(InfoController, services);
            const ordersCtrl = new Controller(OrdersController, services);
            const notFoundCtrl = new Controller(NotFoundController);

            const outlet = $('#container');

            const routes = new Map()
                .set("/", new Route(formCtrl, outlet))
                .set("/menu", new Route(menuCtrl, outlet))
                .set("/info", new Route(infoCtrl, outlet))
                .set("/week-orders", new Route(ordersCtrl, outlet))
                .set('/not-found', new Route(notFoundCtrl, outlet));

            if (window.AlbyJs === undefined) {
                window.AlbyJs = {};
            }

            AlbyJs.Router = new Router(routes);
        }
    };

})();

