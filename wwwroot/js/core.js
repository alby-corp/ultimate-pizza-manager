initIndex = () => link(null, $('#container'));

initMenu = () => {
    getMenu().then(data => {
        data = JSON.parse(data);

        populateTable($("#pizzas"), new TableModel(["Pizza", "Prezzo", "Ingredienti"], data.pizzas.sort(foodSorter)));
        populateTable($("#supplements"), new TableModel(["Supplementi", "Prezzo"], data.supplements.sort(foodSorter)));
        populateTable($("#doughs"), new TableModel(["Impasti", "Prezzo"], data.doughs.sort(foodSorter)));
        populateTable($("#foods"), new TableModel(["Pietanze", "Prezzo", "Ingredienti"], data.foods.sort(foodSorter)));
        populateTable($("#sandwiches"), new TableModel(["Panini", "Prezzo", "Ingredienti"], data.sandwiches.sort(foodSorter)));
        populateTable($("#desserts"), new TableModel(["Dolci", "Prezzo", "Ingredienti"], data.desserts.sort(foodSorter)));
    });
};

initOrders = () => {
    getMenu().then(data => {
        data = JSON.parse(data);

        populateDropDown($("#pizzas"), data.pizzas.sort(foodSorter).map(p => new KeyValuePairModel(p)));
        populateDropDown($("#foods"), data.foods.sort(foodSorter).map(f => new KeyValuePairModel(f)));
        populateDropDown($("#sandwiches"), data.sandwiches.sort(foodSorter).map(s => new KeyValuePairModel(s)));
        populateDropDown($("#desserts"), data.desserts.sort(foodSorter).map(d => new KeyValuePairModel(d)));
        populateDropDown($("#doughs"), data.doughs.map(d => new KeyValuePairModel(d)));
        populateDropDown($("#supplements"), data.supplements.map(s => new KeyValuePairModel(s)));

        conditionalDDL($("#pizzas"), $("#doughs"));
        conditionalDDL($("#pizzas"), $("#supplements"));
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


        populateList($("#week-orders"), data.map(o => new ListModel(o)));
    });
};