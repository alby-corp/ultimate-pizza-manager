import {Option, Common, Order, DropDownList}from'../model';

export const FormController = (function () {

    const privateProps = new WeakMap();

    const getFoodsOptions = (foods, type) => {
        const options = foods.filter(food => food.type === type).map(food => new Option(food.id, food.toString(), false));
        options.unshift(Option.getBlankOption());

        return options;
    };

    const getIngredientsOptions = (data, func) => {
        const options = data.map(s => new Option(s.id, func.call(s), false));
        options.unshift(Option.getBlankOption());

        return options;
    };

    const overrideOnSubmit = (service, alertService) => {
        document.getElementById('order-form').onsubmit = async (event) => {

            event.preventDefault();

            const foods = [];
            let user;

            const userId = $('#users').val();
            if (userId) {
                user = new Common.User(+userId);
            }

            const pizzaId = $('#pizzas').val();
            if (pizzaId) {
                const removals = $('#removals').val().filter(id => !!id).map(r => new Common.Ingredient(+r));
                const supplements = $('#supplements').val().filter(id => !!id).map(s => new Common.Ingredient(+s));

                const pizza = new Common.OrderedFood(new Common.Food(+pizzaId), supplements, removals);

                foods.push(pizza);
            }

            const others = [
                $('#kitchen').val(),
                $('#desserts').val(),
                $('#sandwiches').val()
            ].filter(id => !!id);

            others.forEach(id => {
                foods.push(new Common.OrderedFood(new Common.Food(+id)));
            });

            const order = new Order(user, foods);

            try {
                order.validate();
            } catch (error) {
                alertService.error(error.message);
                return false;
            }

            const result = await service.postOrder(order.toDTO());

            alertService.success(result);

            return false;
        };
    };

    return class {

        static get template() {
            return 'form.html';
        }

        constructor(services) {

            privateProps.set(this, {
                service: services[0],
                alertService: services[1],
            });
        }

        async execute() {
            overrideOnSubmit(privateProps.get(this).service, privateProps.get(this).alertService);

            let users;
            let foods;
            let supplements;

            try {
                users = await privateProps.get(this).service.getUsers();
            } catch (error) {
                privateProps.get(this).alertService.error(`Message: ${error.statusCode || ''} ${error.message}`);
                return;
            }

            try {
                foods = await privateProps.get(this).service.getFoods();
            } catch (error) {
                privateProps.get(this).alertService.error(`${error.status}: ${error.statusText}`);
                return;
            }

            try {
                supplements = await privateProps.get(this).service.getSupplements();
            } catch (error) {
                privateProps.get(this).alertService.error(`${error.status}: ${error.statusText}`);
                return;
            }

            const usersDDL = $('#users');
            new DropDownList(usersDDL, users.map(user => new Option(user.id, user.name, false))).populate();

            const pizzasDDL = $('#pizzas');
            new DropDownList(pizzasDDL, getFoodsOptions(foods, 1)).populate();

            const kitchenDDL = $('#kitchen');
            new DropDownList(kitchenDDL, getFoodsOptions(foods, 2)).populate();

            const dessertsDDL = $('#desserts');
            new DropDownList(dessertsDDL, getFoodsOptions(foods, 3)).populate();

            const sandwichesDDL = $('#sandwiches');
            new DropDownList(sandwichesDDL, getFoodsOptions(foods, 4)).populate();

            const removalsDDL = $('#removals');
            new DropDownList(removalsDDL, null)
                .conditionalEnable(pizzasDDL)
                .autoRefresh(
                    pizzasDDL,
                    (id) => id
                        ? getIngredientsOptions(foods.find(f => f.id === +id).ingredients, Common.Ingredient.prototype.getPropertyDescriptor('name').get)
                        : []
                );

            const supplementsDDL = $('#supplements');
            new DropDownList(supplementsDDL, getIngredientsOptions(supplements, Common.Ingredient.prototype.toString))
                .populate()
                .conditionalEnable(pizzasDDL)
                .autoRefresh(
                    pizzasDDL,
                    (id) => id
                        ? getIngredientsOptions(foods.find(f => f.id === +id).ingredients.exception(supplements), Common.Ingredient.prototype.toString)
                        : getIngredientsOptions(supplements, Common.Ingredient.prototype.toString)
                );

            return this;
        }
    };

})();