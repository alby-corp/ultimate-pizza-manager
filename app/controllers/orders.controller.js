const OrdersController = (function () {

    const privateProps = new WeakMap();

    class OrdersController {

        constructor(service, alertService) {

            privateProps.set(this, {
                service: service,
                alertService: alertService
            });
        }

        static get view() {
            return 'orders.html';
        }

        async execute() {
            let orders;

            try {
                orders = await privateProps.get(this).service.getOrders();
            } catch (error) {
                privateProps.get(this).alertService.error(`${error.status}: ${error.statusText}`);
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