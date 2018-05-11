class App {

    async init() {

        const httpClient = new HttpClient(window.location.origin);
        window.AlbyJs.ResourceService = new ResourceService(httpClient);


        const pageService = new PageService(httpClient);

        const outlet = (data) => {
            $('#container').empty().html(data);
        };

        const infoCtrl = new InfoController(AlbyJs.ResourceService, await pageService.get('info'), outlet);
        const menuCtrl = new MenuController(AlbyJs.ResourceService, await pageService.get('menu'), outlet);
        const ordersCtrl = new OrdersController(AlbyJs.ResourceService, await pageService.get('orders'), outlet);
        const formController = new FormController(AlbyJs.ResourceService, await pageService.get('form'), outlet);

        const routes = new Map().set("/", formController).set("/menu", menuCtrl).set("/week-orders", ordersCtrl).set("/info", infoCtrl);
        window.AlbyJs.Router = new Router(routes);

        const goToWeekOrdersButton = new Button('Vai agli Ordini', new Map([['class', 'btn btn-success'], ['onclick', "AlbyJs.Router.weekOrders()"]]));
        window.AlbyJs.AlertService = {} //new ModalService($('#alert-serivice'), 'alert-service-modal', [goToWeekOrdersButton]); //[`<button class="btn btn-primary" onclick="link('week-orders')">Vai agli Ordini</button>`]);
    }
}


