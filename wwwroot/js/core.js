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
            let orders = await getOrders();
            orders = orders.map(order => new Order(order.user, order.foods, order.data));

            const ordersTable = $('#week-orders');
            new Table(ordersTable, orders.map(order => new OrdersRow(order.user, order.foods, order.total()))).populate();

            const summary = orders.reduce((acc, order) => acc.concat(order.foods), []).groupBy('name');

            const rows = [];
            for (let property in summary) {
                rows.push(new SummaryRow(property, summary[property].length, summary[property].reduce((acc, food) => food.total(), 0)));
            }

            const summaryTable = $('#summary');
            new Table(summaryTable, rows).populate();
        };
    }

    return Core;
})();


