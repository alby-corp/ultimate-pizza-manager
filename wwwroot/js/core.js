const Core = (function () {

    class Core {

        static initIndex() {
            link(null, $('#container'));
        };

        static async initMakeOrders() {

            const users = await getUsers();
            const foods = await getFoods();
            const supplements = await getSupplements();

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
            const orders = await getOrders();

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
            new Span(totalSpan, orders.reduce((acc, order) => acc += +order.total(), 0)).populate();
        };
    }

    return Core;
})();

// orderedFoods.map(orderedFood => orderedFood.food.id.toString() + orderedFood.supplements.map(s => s.id).toString() + orderedFood.removals.map(r => r.id).toString())

