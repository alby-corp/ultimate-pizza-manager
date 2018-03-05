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

        static overrideOnSubmit(users, ingredients, foods) {
            $('#order-form').removeAttr('onsubmit').submit(function (event) {

                event.preventDefault();

                const inputs = $('#order-form :input');
                const order = new Order();

                const val = $(this).val();
                const keys = $.isArray(val) ? parseInt(val.toString()) : val.map(keys => parseInt(keys));

                inputs.each(function () {

                    switch (this.name) {
                        case 'user':
                            order.user = users.find(user => user.id === keys);
                            break;
                        case 'supplements':
                            const supplement = ingredients.filter(supplement => $.inArray(supplement.id, keys) > -1);
                            supplement.isRemoval = false;
                            order.ingredients.push(supplement);
                            break;
                        case 'removals':
                            const removal = ingredients.filter(supplement => $.inArray(supplement.id, keys) > -1);
                            removal.isRemoval = true;
                            order.ingredients.push(removal);
                            break;
                        default:
                            order.foods.push(foods.find(food => food.id === keys));
                    }
                });

                $.post('insert', JSON.stringify(order));

                return false;
            });
        };
    }

    return Helpers

})();