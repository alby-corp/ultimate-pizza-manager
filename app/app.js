const App = (function () {

    const Controller = (function () {

        const privateProps = new WeakMap();

        class Controller {

            constructor(controller, func, services) {
                privateProps.set(this, {
                    instance: new controller(services),
                    view: func(controller.template)
                });
            }

            get instance() {
                return privateProps.get(this).instance;
            }

            get view() {
                return privateProps.get(this).view;
            }
        }

        return Controller;

    })();


    return (function () {

        const client = new HttpClient(window.location.origin);

        let resourceService;
        let alertService;

        const initServices = () => {
            resourceService = new ResourceService(client);

            const goToWeekOrdersButton = new Button('Vai agli Ordini', new Map([['class', 'btn btn-success'], ['onclick', "AlbyJs.Router.link('week-orders')"]]));
            alertService = new ModalService($('#alert-serivice'), 'alert-service-modal', [goToWeekOrdersButton]); //[`<button class="btn btn-primary" onclick="link('week-orders')">Vai agli Ordini</button>`]);
        };

        class App {

            async init() {

                initServices();
                const services = [resourceService, alertService];

                const getView = (template) => client.get(`app/views/${template}`);

                const formCtrl = new Controller(FormController, getView, services);
                const menuCtrl = new Controller(MenuController, getView, services);
                const infoCtrl = new Controller(InfoController, getView, services);
                const ordersCtrl = new Controller(OrdersController, getView, services);
                const notFoundCtrl = new Controller(NotFoundController, getView);

                const outlet = $('#container');

                const routes = new Map()
                    .set("/", new Route(formCtrl, outlet))
                    .set("/menu", new Route(menuCtrl, outlet))
                    .set("/info", new Route(infoCtrl, outlet))
                    .set("/week-orders", new Route(ordersCtrl, outlet))
                    .set('/not-found', new Route(notFoundCtrl, outlet));

                window.AlbyJs.Router = new Router(routes);
            }
        }

        return App;

    })();

})();




