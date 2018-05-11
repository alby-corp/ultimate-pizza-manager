const ResourceService = (function () {

    const getURI = (uri) => `api/${uri}`;

    class ResourceService {

        constructor(client) {

            this.getUsers = async () => {
                const users = await client.get(getURI('users'));
                return users.map(u => new AlbyJs.Common.User(u.id, u.username));
            };

            this.getFoods = async () => {
                const foods = await client.get(getURI('foods'));
                return foods.map(f => new AlbyJs.Common.Food(f.id, f.name, f.price, f.ingredients, f.type));
            };

            this.getSupplements = async () => {
                const supplements = await client.get(getURI('supplements'));
                return supplements.map(s => new AlbyJs.Common.Ingredient(s.id, s.name, s.price));
            };

            this.getOrders = async () => {
                const orders = await client.get(getURI('orders'));
                return orders.map(order => new AlbyJs.Common.Order(order.user, order.foods, order.date));
            };

            this.getAdministrators = async () => {
                const administrators = await client.get(getURI('administrators'));
                return administrators.map(admin => new AlbyJs.Common.Administrator(admin.name, admin.onHoliday));
            };

            this.postOrder = (body) => {
                return client.post(getURI('orders'), body);
            };
        };
    }

    return ResourceService;

})();

const PageService = (function () {

    const getURI = (uri) => `app/views/${uri}.html`;

    class PageService {

        constructor(client) {

            this.get = (uri) => {
                return client.get(getURI(uri));
            };
        };
    }

    return PageService;

})();

const ModalService = (function () {
    const renderModal = function (title, body, buttons, name, style) {
        const renderedButtons = [];
        buttons.forEach(button => {
            renderedButtons.push(button.render());
        });

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
                                    ${renderedButtons.join('')}
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
        
                            </div>
                        </div>
                    </div>`;
    };

    const create = function (display, title, body, buttons, name, style) {
        display.html(
            renderModal(title, body, buttons, name, style)
        );
    };

    const open = function (name) {
        $(`#${name}`).modal('show');
    };

    const privateProps = new WeakMap();

    class ModalService {
        constructor(display, name, buttons) {
            buttons.forEach(button => button.attrs.set('data-dismiss', 'modal'));
            privateProps.set(this, {
                display: display,
                name: name,
                buttons: buttons
            });
        }

        success(body) {
            create(privateProps.get(this).display, 'Success', body, privateProps.get(this).buttons, privateProps.get(this).name, 'alert alert-success');
            open(privateProps.get(this).name);
        }

        error(body) {
            create(privateProps.get(this).display, 'Error', body, [], privateProps.get(this).name, 'alert alert-danger');
            open(privateProps.get(this).name);
        }
    }

    return ModalService;
})();