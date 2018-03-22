const Core = (function () {

    class Core {

        static initIndex() {
            link(null, $('#container'));
        };

        static async initOrders() {

            const users = await getUsers();
            const foods = await getFoods();
            const ingredients = await getSupplements();

            Helpers.overrideOnSubmit(users, ingredients, foods);

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
                        ? Helpers.getIngredientsOptions(foods.find(f => f.id === +id).ingredients, Helpers.getPropertyDescriptor(Ingredient.prototype, 'name').get)
                        : []
                );

            const supplementsDDL = $('#supplements');
            new DropDownList(supplementsDDL, Helpers.getIngredientsOptions(ingredients, Ingredient.prototype.toString))
                .populate()
                .conditionalEnable(pizzasDDL)
                .autoRefresh(
                    pizzasDDL,
                    (id) => id
                        ? Helpers.getIngredientsOptions(Helpers.exception(ingredients, foods.find(f => f.id === +id).ingredients), Ingredient.prototype.toString)
                        : Helpers.getIngredientsOptions(ingredients, Ingredient.prototype.toString)
                );
        };
    }

    return Core;
})();


initWeekOrders = async () => {
    let orders = await getWeekOrders();
    orders = orders.map(order => new Order(order.user, order.foods, order.data));

    const table = $('#week-orders');

    const t = new Table(table, orders);
    t.populate();

};