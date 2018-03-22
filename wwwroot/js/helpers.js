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

    static getPropertyDescriptor (obj, key) {
        return Object.getOwnPropertyDescriptor(obj, key) || this.getPropertyDescriptor(Object.getPrototypeOf(obj), key)
    }

    static overrideOnSubmit() {
        $('#order-form').submit(() => {
            event.preventDefault();

            const order = new Order();

            const userId =  document.getElementById('users').value; // $('#users').val();
            if (userId){
                order.user = new User(+userId);
            }

            const pizzaId = document.getElementById('pizzas').value;   //$('#pizzas').val();
            if (pizzaId) {
                const pizza = new Food(+pizzaId);
                pizza.removals = $('#removals').val().filter(id => !!id).map(r => new Ingredient(+r));
                pizza.supplements = $('#supplements').val().filter(id => !!id).map(s => new Ingredient(+s));

                order.foods.push(pizza);
            }

            const others = [
                $('#kitchen').val(),
                $('#desserts').val(),
                $('#sandwiches').val()
            ].filter(id => !!id);

            others.forEach(id => {
                order.foods.push(new Food(+id));
            });

            try {
                order.validate()
            } catch (error) {
                alertService(error.message);
                return false;
            }

            $.post('insert', order.toDTO());
            return false;
        });
    };
}
