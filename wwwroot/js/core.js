const Core = (function () {

    const responseHandler = async function responseHandler(func) {
        try {
            return await func();
        } catch (error) {
            AlbyJs.AlertService.error(error);
            throw error;
        }
    };

    class Core {

        static initIndex() {
            AlbyJs.Router.orders()
        };

        static async initMakeOrders() {

            let users;
            let foods;
            let supplements;

            try {
                users = await responseHandler(AlbyJs.ResourceService.getUsers);
                foods = await responseHandler(AlbyJs.ResourceService.getFoods);
                supplements = await responseHandler(AlbyJs.ResourceService.getSupplements);
            } catch {
                return;
            }

            Helpers.overrideOnSubmit();

            const usersDDL = $('#users');
            new DropDownList(usersDDL, users.map(user => new Option(user.id, user.name, false))).populate();

            const pizzasDDL = $('#pizzas');
            new DropDownList(pizzasDDL, Helpers.getFoodsOptions(foods, 1)).populate();

            const kitchenDDL = $('#kitchen');
            new DropDownList(kitchenDDL, Helpers.getFoodsOptions(foods, 2)).populate();

            const dessertsDDL = $('#desserts');
            new DropDownList(dessertsDDL, Helpers.getFoodsOptions(foods, 3)).populate();

            const sandwichesDDL = $('#sandwiches');
            new DropDownList(sandwichesDDL, Helpers.getFoodsOptions(foods, 4)).populate();

            const removalsDDL = $('#removals');
            new DropDownList(removalsDDL, null)
                .conditionalEnable(pizzasDDL)
                .autoRefresh(
                    pizzasDDL,
                    (id) => id
                        ? Helpers.getIngredientsOptions(foods.find(f => f.id === +id).ingredients, Helpers.getPropertyDescriptor(AlbyJs.Common.Ingredient.prototype, 'name').get)
                        : []
                );

            const supplementsDDL = $('#supplements');
            new DropDownList(supplementsDDL, Helpers.getIngredientsOptions(supplements, AlbyJs.Common.Ingredient.prototype.toString))
                .populate()
                .conditionalEnable(pizzasDDL)
                .autoRefresh(
                    pizzasDDL,
                    (id) => id
                        ? Helpers.getIngredientsOptions(Helpers.exception(supplements, foods.find(f => f.id === +id).ingredients), AlbyJs.Common.Ingredient.prototype.toString)
                        : Helpers.getIngredientsOptions(supplements, AlbyJs.Common.Ingredient.prototype.toString)
                );
        };

        static async initGetOrders() {

            let orders;

            try {
                orders = await responseHandler(AlbyJs.ResourceService.getOrders);
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
        };

        static async initInfo() {

            let administrators;

            try {
                administrators = await responseHandler(AlbyJs.ResourceService.getAdministrators);
            } catch {
                return;
            }


            const adminList = $('#admin-list');
            new List(adminList, administrators.map(admin => new AdminListItem(admin))).populate();
        }
    }

    return Core;
})();