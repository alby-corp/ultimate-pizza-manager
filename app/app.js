const App = (function () {

    const privateProps = new WeakMap();

    class Route{
        constructor(controller, outlet, ...services){
            privateProps.set(this, {
                controller: controller,
                outlet: outlet,
                services: services
            });
        }

        get controller(){
            return privateProps.get(this).controller;
        }

        get outlet(){
            return privateProps.get(this).outlet;
        }

        get services(){
            return privateProps.get(this).services;
        }
    }


    class App {

        async init() {

            const httpClient = new HttpClient(window.location.origin);
            const resourceService = new ResourceService(httpClient);

            const goToWeekOrdersButton = new Button('Vai agli Ordini', new Map([['class', 'btn btn-success'], ['onclick', "AlbyJs.Router.link('week-orders')"]]));
            const alertService = new ModalService($('#alert-serivice'), 'alert-service-modal', [goToWeekOrdersButton]); //[`<button class="btn btn-primary" onclick="link('week-orders')">Vai agli Ordini</button>`]);

            const outlet = (data) => {
                $('#container').empty().html(data);
            };

            const routes = new Map()
                .set("/", new Route(InfoController, outlet, resourceService, alertService))
                .set("/menu", new Route(MenuController, outlet, resourceService, alertService))
                .set("/week-orders", new Route(OrdersController, outlet, resourceService, alertService))
                .set("/info", new Route(InfoController, outlet, resourceService, alertService))
                .set('/not-found', new Route(NotFoundController, outlet, resourceService, alertService));

            window.AlbyJs.Router = new Router(httpClient, routes);
        }
    }

    return App;
})();




