getUsers = async () => {
    const users = await Ajax.get('users');
    return users.map(u => new AlbyJs.Common.User(u.id, u.username));
};

getFoods = async () => {
    const foods = await Ajax.get('foods');
    return foods.map(f => new AlbyJs.Common.Food(f.id, f.name, f.price, f.ingredients, f.type));
};

getSupplements = async () => {
    const supplements = await Ajax.get('supplements');
    return supplements.map(s => new AlbyJs.Common.Ingredient(s.id, s.name, s.price));
};

getOrders = async () => {

    const orders = await Ajax.get('orders');
    return orders.map(order => new AlbyJs.Common.Order(order.user, order.foods, order.date));
};

getAdministrators = async () => {
    const administrators = await Ajax.get('administrators');
    return administrators.map(admin => new AlbyJs.Common.Administrator(admin.name, admin.onHoliday));
};

// Pages
getMenu = () => Ajax.get('menu');

getOrdersPage = () => Ajax.get('order.html');


getMenuPage = () => Ajax.get('menu.html');

getWeekOrdersPage = () => Ajax.get('week-orders.html');

getInfoPage = () => Ajax.get('info.html');

const ModalService = (function () {
    const renderModal = function (title, body, buttons, name, style) {
        return `    <div class="modal fade" id="${name}">
                        <div class="modal-dialog">
                            <div class="modal-content">
      
                                <!-- Modal Header -->
                                <div class="modal-header ${style}">
                                    <h4 class="modal-title">${title}</h4>
                                </div>
        
                                <!-- Modal body -->
                                <div class="modal-body">
                                    ${body}
                                </div>
        
                                <!-- Modal footer -->
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    ${buttons.join('')}
                                </div>
        
                            </div>
                        </div>
                    </div>`;
    };

    const open = function (selector) {
        $(`#${selector}`).modal('show');
    };

    const privateProps = new WeakMap();

    class ModalService {
        constructor(display, name, buttons) {
            privateProps.set(this, {
                display: display,
                name: name,
                buttons: buttons
            });
        }

        success(body) {
            privateProps.get(this).display.html(renderModal('Success', body, privateProps.get(this).buttons, privateProps.get(this).name, 'alert alert-success'));
            open(privateProps.get(this).name);
        }

        error(body) {

        }
    }

    return ModalService;
})();

if (window.AlbyJs === undefined) {
    window.AlbyJs = {};
}

window.AlbyJs.AlertService = new ModalService($('#alert-serivice'), 'alert-service-modal', [`<button class="btn btn-primary" onclick="link('week-orders')">Vai agli Ordini</button>`]);
