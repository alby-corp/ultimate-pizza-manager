const Helpers = (function () {

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

        static populateContainer(data, container) {
            container.html(data);
        };

        static alert(message) {
            alert(message);
        }

        static overrideOnSubmit(users, ingredients, foods) {
            $('#order-form').removeAttr('onsubmit').submit(function (event) {

                event.preventDefault();

                const pizzas = $('#pizzas');
                let inputs;

                const order = new Order();
                const pizzaKey = parseInt(pizzas.val());
                let pizza;

                if ($.isNumeric(pizzaKey)) {
                    pizza = foods.find(f => f.id === pizzaKey);
                    inputs = $('#order-form select').not('#pizzas');
                } else {
                    inputs = $('#order-form select').not('#pizzas').not('#supplements').not('#removals');
                }

                inputs.each(function () {

                    const val = $(this).val();
                    const keys = $.isArray(val) ? val.map(keys => parseInt(keys)) : parseInt(val.toString());

                    switch (this.name) {
                        case 'user':
                            order.user = users.find(user => user.id === keys);
                            break;
                        case 'supplements':
                            const supplements = ingredients.filter(supplement => $.inArray(supplement.id, keys) > -1);
                            pizza.supplements.push(supplements);
                            break;
                        case 'removals':
                            const removals = ingredients.filter(supplement => $.inArray(supplement.id, keys) > -1);
                            pizza.removals.push(removals);
                            break;
                        default:
                            const food = foods.find(food => food.id === keys);
                            if (food !== undefined) {
                                order.foods.push(food);
                            }
                    }
                });

                if (pizza !== undefined) {
                    order.foods.push(pizza);
                }

                try {
                    order.validate()
                } catch (exception) {
                    alertService(exception.message);
                    return false; // from within a jQuery event handler is effectively the same as calling both e.preventDefault and e.stopPropagation on the passed.
                }

                $.post('insert', JSON.stringify(order));
            });
        };
    }

    return Helpers

})();