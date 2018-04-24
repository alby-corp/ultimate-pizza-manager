class Container {

    static init() {
        if (window.AlbyJs === undefined) {
            window.AlbyJs = {};
        }

        const httpClient = new HttpClient(window.location.href);

        window.AlbyJs.ResourceService = new ResourceService(httpClient);
        window.AlbyJs.PageService = new PageService(httpClient);

        window.AlbyJs.Router = new Router(window.AlbyJs.PageService);

        const goToWeekOrdersButton = new Button('Vai agli Ordini', new Map([['class', 'btn btn-success'], ['onclick', "AlbyJs.Router.weekOrders()"]]));
        window.AlbyJs.AlertService = new ModalService($('#alert-serivice'), 'alert-service-modal', [goToWeekOrdersButton]); //[`<button class="btn btn-primary" onclick="link('week-orders')">Vai agli Ordini</button>`]);
    }
}


