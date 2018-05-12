const MenuController = (function () {

    const privateProps = new WeakMap();

    class MenuController {
        constructor(service, alertService) {

            privateProps.set(this, {
                service: service,
                alertService: alertService
            });
        }

        static get view() {
            return 'menu.html';
        }

        async execute() {
            let menu;

            try {
                menu = await privateProps.get(this).service.getFoods;
            } catch (error) {
                privateProps.get(this).alertService.error(`${error.status}: ${error.statusText}`);
                return;
            }

            const pizzasMenuTable = $('#pizzas-menu');
            new Table(pizzasMenuTable, menu.filter(food => food.type === 1).map(food => new FoodRow(food))).populate();

            const cookingMenuTable = $('#cooking-menu');
            new Table(cookingMenuTable, menu.filter(food => food.type === 2).map(food => new FoodRow(food))).populate();

            const sandwichesMenuTable = $('#sandwiches-menu');
            new Table(sandwichesMenuTable, menu.filter(food => food.type === 4).map(food => new FoodRow(food))).populate();

            const dessertMenuTable = $('#desserts-menu');
            new Table(dessertMenuTable, menu.filter(food => food.type === 3).map(food => new FoodRow(food))).populate();

            let supplements;

            try {
                supplements = await responseHandler(AlbyJs.ResourceService.getSupplements);
            } catch (error) {
                return;
            }

            const supplementsMenuTable = $('#supplements-menu');
            new Table(supplementsMenuTable, supplements.map(ingredient => new IngredientRow(ingredient))).populate();

            return this;
        }
    }

    return MenuController;

})();