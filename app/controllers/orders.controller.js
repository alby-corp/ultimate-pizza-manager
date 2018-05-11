const OrdersController = (function () {

    const privateProps = new WeakMap();

    class OrdersController extends BaseController{

        constructor(resourceService, view, outlet, alertService) {
            super(view, outlet, alertService);

            privateProps.set(this, {
                service: resourceService,
                view: view,
                outlet: outlet,
                alertService: alertService
            });
        }

        async populate() {
            let orders;

            try {
                orders = await this.responseHandler(privateProps.get(this).service.getOrders);
            } catch {
                return;
            }

            const ordersTable = $('#week-orders');
            new Table(ordersTable, orders.map(order => new OrdersRow(order))).populate();

            const summaryTable = $('#summary-orders');

            const ordersWithKey = _.flatten(orders.map(o => o.foods)).map(orderedFood => {
                return {
                    key: orderedFood.food.id.toString() + orderedFood.supplements.map(s => s.id).toString() + orderedFood.removals.map(r => r.id).toString(),
                    order: orderedFood
                }
            });

            const summaryRows =
                _.map(_.groupBy(ordersWithKey, (order) => order.key), (orderWithKey) => {
                    return new SummaryRow(_.first(orderWithKey).order, orderWithKey.length)

                });

            new Table(summaryTable, summaryRows).populate();

            const totalSpan = $('#total');
            new Span(totalSpan, orders.reduce((acc, order) => acc += +order.total(), 0).toFixed(2) + ' &euro;').populate();

            return this;
        }

    }

    return OrdersController;

})();