initIndex = () => link(null, $('#container'));

initMenu = () => {
    getMenu().then(data => {
        data = JSON.parse(data);

        populateTable($('#pizzas'), new TableModel(['Pizza', 'Prezzo', 'Ingredienti'], data.pizzas.sort(foodSorter)));
        populateTable($('#supplements'), new TableModel(['Supplementi', 'Prezzo'], data.supplements.sort(foodSorter)));
        populateTable($('#doughs'), new TableModel(['Impasti', 'Prezzo'], data.doughs.sort(foodSorter)));
        populateTable($('#foods'), new TableModel(['Pietanze', 'Prezzo', 'Ingredienti'], data.foods.sort(foodSorter)));
        populateTable($('#sandwiches'), new TableModel(['Panini', 'Prezzo', 'Ingredienti'], data.sandwiches.sort(foodSorter)));
        populateTable($('#desserts'), new TableModel(['Dolci', 'Prezzo', 'Ingredienti'], data.desserts.sort(foodSorter)));
    });
};

initOrders = () => {
    getMenu().then(data => {
        data = JSON.parse(data);

        const pizzasDDL = $('#pizzas');
        const kitchenDDL = $('#kitchen');
        const sandwichesDDL = $('#sandwiches');
        const dessertsDDL = $('#desserts');
        const doughsDDL = $('#doughs');
        const supplementsDDL = $('#supplements');
        const removalsDDL = $('#removals');

        populateDropDown(pizzasDDL, data.foods.filter(data => data.type === 0).sort(foodSorter).map(p => new KeyValuePairModel(new Food(p.id, p.name, p.price, p.ingredients, p.type))), KeyValuePairModel.prototype.toPriceNameString);
        populateDropDown(doughsDDL, data.foods.filter(data => data.type === 1).sort(foodSorter).map(p => new KeyValuePairModel(new Food(p.id, p.name, p.price, p.ingredients, p.type))), KeyValuePairModel.prototype.toPriceNameString);
        populateDropDown(kitchenDDL, data.foods.filter(data => data.type === 2).sort(foodSorter).map(p => new KeyValuePairModel(new Food(p.id, p.name, p.price, p.ingredients, p.type))), KeyValuePairModel.prototype.toPriceNameString);
        populateDropDown(sandwichesDDL, data.foods.filter(data => data.type === 3).sort(foodSorter).map(p => new KeyValuePairModel(new Food(p.id, p.name, p.price, p.ingredients, p.type))), KeyValuePairModel.prototype.toPriceNameString);
        populateDropDown(dessertsDDL, data.foods.filter(data => data.type === 4).sort(foodSorter).map(p => new KeyValuePairModel(new Food(p.id, p.name, p.price, p.ingredients, p.type))), KeyValuePairModel.prototype.toPriceNameString);
        populateDropDown(supplementsDDL, data.ingredients.filter(data => data.isSupplement === true).sort(foodSorter).map(p => new KeyValuePairModel(new Ingredient(p.id, p.name, p.price, p.isSupplement))), KeyValuePairModel.prototype.toPriceNameString);
        // optionalPopulateDropDown(removalsDDL, pizzasDDL);

        // enableConditionalDDL(pizzasDDL, removalsDDL);
        enableConditionalDDL(pizzasDDL, doughsDDL);
        // enableConditionalDDL(pizzasDDL, supplementsDDL);
    });
};

initWeekOrders = () => {
    getWeekOrders().then(data => {

        data = data.reduce((acc, x) => {
            if (acc.length === 0) {
                acc.push(x)
            } else {
                if (!acc.map(element => element.user).includes(x.user)) {
                    acc.push(x)
                } else {
                    const saved = acc.find((obj) => obj.user === x.user);
                    if (saved.data < x.data) {
                        const index = acc.indexOf(saved);
                        acc.splice(index, 1);
                        acc.push(x);
                    }
                }
            }
            return acc
        }, []);


        populateList($('#week-orders'), data.map(o => new ListModel(o)));
    });
};