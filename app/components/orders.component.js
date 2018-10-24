import template from '../views/orders.html';

import {OrdersRow, Table, SummaryRow, Span} from '../model';
import {BaseComponent} from "./base.component";

export const OrdersComponent = (function () {

    const privateProps = new WeakMap();

    return class extends BaseComponent {

        constructor(service, alertService) {

            super(template);

            privateProps.set(this, {
                service: service,
                alertService: alertService
            });
        }

        get template() {
            return template;
        }

        async execute() {
            let orders;

            try {
                orders = await super.invokeWithCatcher(privateProps.get(this).service.getOrders);
            } catch (error) {
                return;
            }

            const ordersTable = $('#week-orders');
            new Table(ordersTable, orders.map((order, index) => new OrdersRow(index, order))).populate();

            const summaryTable = $('#summary-orders');

            const ordersWithKey = _.flatten(orders.map(o => o.foods)).map(orderedFood => {
                return {
                    key: orderedFood.food.id.toString() + orderedFood.supplements.map(s => s.id).toString() + orderedFood.removals.map(r => r.id).toString(),
                    order: orderedFood
                }
            });

            const summaryRows =
                _.sortBy(_.map(_.groupBy(ordersWithKey, (order) => order.key), (orderWithKey) => {
                    return new SummaryRow(_.first(orderWithKey).order, orderWithKey.length)
                }), (order) => order.orderedFood.food.type + order.orderedFood.food.name);

            new Table(summaryTable, summaryRows).populate();

            const totalSpan = $('#total');
            new Span(totalSpan, orders.reduce((acc, order) => acc += +order.total(), 0).toFixed(2) + ' &euro;').populate();

            return this;
        }

    };

})();