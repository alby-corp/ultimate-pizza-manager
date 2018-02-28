initIndex = () => link(null, $('#container'));

initMenu = () => {
    getFoods().then(data => {
        data = JSON.parse(data);

        populateTable($('#pizzas'), new TableModel(['Pizza', 'Prezzo', 'Ingredienti'], data.pizzas.sort(foodSorter)));
        populateTable($('#supplements'), new TableModel(['Supplementi', 'Prezzo'], data.supplements.sort(foodSorter)));
        populateTable($('#doughs'), new TableModel(['Impasti', 'Prezzo'], data.doughs.sort(foodSorter)));
        populateTable($('#foods'), new TableModel(['Pietanze', 'Prezzo', 'Ingredienti'], data.foods.sort(foodSorter)));
        populateTable($('#sandwiches'), new TableModel(['Panini', 'Prezzo', 'Ingredienti'], data.sandwiches.sort(foodSorter)));
        populateTable($('#desserts'), new TableModel(['Dolci', 'Prezzo', 'Ingredienti'], data.desserts.sort(foodSorter)));
    });
};

initOrders = async () => {

    const users = await getUsers();
    const usersDDL = $('#users');
    new DropDownList(usersDDL, getUsersOptions(users)).populate();

    const foods = await getFoods();

    const pizzasDDL = $('#pizzas');
    new DropDownList(pizzasDDL, getFoodsOptions(foods, 1)).populate();

    const kitchenDDL = $('#kitchen');
    new DropDownList(kitchenDDL, getFoodsOptions(foods, 2)).populate();

    const dessertsDDL = $('#desserts');
    new DropDownList(dessertsDDL, getFoodsOptions(foods, 3)).populate();

    const sandwichesDDL = $('#sandwiches');
    new DropDownList(sandwichesDDL, getFoodsOptions(foods, 4)).populate();

    const supplementsDDL = $('#supplements');

    const removalsDDL = $('#removals');
    new DropDownList(removalsDDL, null)
        .conditionalEnable(pizzasDDL)
        .autoRefresh(pizzasDDL, (id) => getIngredientsOptions(foods.find(f => f.id === id).ingredients, Object.getOwnPropertyDescriptor(Ingredient.prototype, 'name').get));
};

getFoodsOptions = (foods, type) => {
    const options = foods.filter(food => food.type === type).map(food => new Option(food.id, food.toString(), false, false));
    options.push(Option.getBlankOption());
    options.sort(optionsSorter);

    return options;
};

getIngredientsOptions = (data, func) => {
    const options = data.map(s => new Option(s.id, func.call(s), false, false));
    options.push(Option.getBlankOption());
    options.sort(optionsSorter);

    return options;
};

getUsersOptions = (data) => {
    const options = data.map(user => new Option(user.id, user.name, false, false));
    options.push(Option.getBlankDisabledOption());
    options.sort(optionsSorter);

    return options;
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