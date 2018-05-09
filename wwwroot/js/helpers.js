const debug = require('debug')('myapp:server');

class Helpers {

    static getFoodsOptions(foods, type) {
        const options = foods.filter(food => food.type === type).map(food => new Option(food.id, food.toString(), false));
        options.unshift(Option.getBlankOption());

        return options;
    };

    static getIngredientsOptions(data, func) {
        const options = data.map(s => new Option(s.id, func.call(s), false));
        options.unshift(Option.getBlankOption());

        return options;
    };

    static exception(arr1, arr2) {
        return arr1.filter((e) => arr2.map(a => a.id).indexOf(e.id) === -1)
    };

    static getPropertyDescriptor(obj, key) {
        return Object.getOwnPropertyDescriptor(obj, key) || this.getPropertyDescriptor(Object.getPrototypeOf(obj), key)
    }

    static overrideOnSubmit() {
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
}
