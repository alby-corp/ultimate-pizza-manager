// Navigation
const Router = (function () {

    const privateProps = new WeakMap();

    const populate = function (data) {
        $('#container').empty().html(data);
    };

    class Router {
        constructor(service) {
            privateProps.set(this, {
                service: service
            });
        }

        async menu() {
            populate(await privateProps.get(this).service.getMenuPage())
        }

        async weekOrders() {
            populate(await privateProps.get(this).service.getWeekOrdersPage())
        }

        async info() {
            populate(await privateProps.get(this).service.getInfoPage())
        }

        async orders() {
            populate(await privateProps.get(this).service.getOrdersPage())
        }
    }

    return Router;

})();








