const FormController = (function () {

    const privateProps = new WeakMap();

    const overrideOnSubmit = () => {
        $('#order-form').submit(async () => {

            event.preventDefault();

            const foods = [];
            let user;

            const userId = $('#users').val();
            if (userId) {
                user = new AlbyJs.Common.User(+userId);
            }

            const pizzaId = $('#pizzas').val();
            if (pizzaId) {
                const removals = $('#removals').val().filter(id => !!id).map(r => new AlbyJs.Common.Ingredient(+r));
                const supplements = $('#supplements').val().filter(id => !!id).map(s => new AlbyJs.Common.Ingredient(+s));

                const pizza = new AlbyJs.Common.OrderedFood(new AlbyJs.Common.Food(+pizzaId), supplements, removals);

                foods.push(pizza);
            }

            const others = [
                $('#kitchen').val(),
                $('#desserts').val(),
                $('#sandwiches').val()
            ].filter(id => !!id);

            others.forEach(id => {
                foods.push(new AlbyJs.Common.OrderedFood(new AlbyJs.Common.Food(+id)));
            });

            const order = new Order(user, foods);

            try {
                order.validate();
            } catch (error) {
                AlbyJs.AlertService.error(error.message);
                return false;
            }

            const result = await $.post('insert', order.toDTO());

            AlbyJs.AlertService.success(result);

            return false;
        });
    };

    class FormController extends BaseController {

        constructor(resourceService, view, outlet) {
            super(view, outlet);

            privateProps.set(this, {
                resourceService: resourceService,
                view: view,
                outlet: outlet
            });
        }

        async populate() {
            let users;
            let foods;
            let supplements;

            try {
                users = await this.responseHandler(AlbyJs.ResourceService.getUsers);
                foods = await this.responseHandler(AlbyJs.ResourceService.getFoods);
                supplements = await this.responseHandler(AlbyJs.ResourceService.getSupplements);
            } catch {
                return;
            }

            overrideOnSubmit();

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

            return this;
        }
    }

    return FormController;

})();