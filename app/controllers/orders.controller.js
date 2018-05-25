import template from '../views/orders.html';

import {OrdersRow, Table, SummaryRow, Span} from '../model';
import {BaseController} from "./base.controller";

export const OrdersController = (function () {

    const privateProps = new WeakMap();

    return class OrdersController extends BaseController {

        static get template() {
            return template;
        }

        constructor(services) {

            super(template);

            privateProps.set(this, {
                service: services[0],
                alertService: services[1]
            });
        }

        async execute() {
            let orders;

            try {
                orders = await privateProps.get(this).service.getOrders();
            } catch (error) {
                privateProps.get(this).alertService.error(`Error: ${error.status} ${error.statusText}`);
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

    };

})();