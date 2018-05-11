class App {

    async init() {

        const httpClient = new HttpClient(window.location.origin);
        const resourceService = new ResourceService(httpClient);

        const pageService = new PageService(httpClient);

        const goToWeekOrdersButton = new Button('Vai agli Ordini', new Map([['class', 'btn btn-success'], ['onclick', "AlbyJs.Router.weekOrders()"]]));
        const alertService = new ModalService($('#alert-serivice'), 'alert-service-modal', [goToWeekOrdersButton]); //[`<button class="btn btn-primary" onclick="link('week-orders')">Vai agli Ordini</button>`]);

        const outlet = (data) => {
            $('#container').empty().html(data);
        };

        const infoCtrl = new InfoController(resourceService, await pageService.get('info'), outlet, alertService);
        const menuCtrl = new MenuController(resourceService, await pageService.get('menu'), outlet, alertService);
        const ordersCtrl = new OrdersController(resourceService, await pageService.get('orders'), outlet, alertService);
        const formController = new FormController(resourceService, await pageService.get('form'), outlet, alertService);
        const notFountController = new NotFoundController(resourceService, await pageService.get('not-found'), outlet, alertService);

        const routes = new Map().set("/", formController).set("/menu", menuCtrl).set("/week-orders", ordersCtrl).set("/info", infoCtrl).set('/not-found', notFountController);
        window.AlbyJs.Router = new Router(routes);

    }
}


