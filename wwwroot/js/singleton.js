if (window.AlbyJs === undefined) {
    window.AlbyJs = {};
}

const goToWeekOrdersButton = new Button('Vai agli Ordini', new Map([['class', 'btn btn-success'], ['onclick', "link('week-orders')"]]));
window.AlbyJs.AlertService = new ModalService($('#alert-serivice'), 'alert-service-modal', [goToWeekOrdersButton]); //[`<button class="btn btn-primary" onclick="link('week-orders')">Vai agli Ordini</button>`]);
