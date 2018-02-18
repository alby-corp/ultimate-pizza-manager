initIndex = () => link(null, $('#container'));

initMenu = () => {
    getMenu().then(data => {
        data = JSON.parse(data);

        data.pizzas.sort(foodSorter);
        data.supplements.sort(foodSorter);
        data.dough.sort(foodSorter);
        data.food.sort(foodSorter);
        data.sandwiches.sort(foodSorter);
        data.desserts.sort(foodSorter);

        populateTable($("#pizzas tbody"), data.pizzas.map(p => p.food), data.pizzas.map(p => price(p)));
        populateTable($("#supplements tbody"), data.supplements.map(s => s.food), data.supplements.map(s => price(s)));
        populateTable($("#dough tbody"), data.dough.map(d => d.food), data.dough.map(d => price(d)));
        populateTable($("#food tbody"), data.food.map(f => f.food), data.food.map(f => price(f)));
        populateTable($("#sandwiches tbody"), data.sandwiches.map(s => s.food), data.sandwiches.map(s => price(s)));
        populateTable($("#desserts tbody"), data.desserts.map(d => d.food), data.desserts.map(d => price(d)));
    });
};

initOrders = () => {
    getMenu().then(data => {
        data = JSON.parse(data);

        populateDropDown($("#pizza"), data.pizzas.sort(foodSorter).map(p => foodAndPrice(p)));
        populateDropDown($("#food"), data.food.sort(foodSorter).map(f => foodAndPrice(f)));
        populateDropDown($("#sandwiches"), data.sandwiches.sort(foodSorter).map(s => foodAndPrice(s)));
        populateDropDown($("#desserts"), data.desserts.sort(foodSorter).map(d => foodAndPrice(d)));

        populateCheckBoxList($("#supplements"), data.supplements.map(s => foodAndPrice(s)));
        populateCheckBoxList($("#dough"), data.dough.map(d => foodAndPrice(d)));
    });
};

initWeekOrders = () => {
    getWeekOrders().then(data => {

        // const yesterday = (d => new Date(d.setDate(d.getDate() - 1)))(new Date).toJSON();

        data = JSON.parse(data).orders
            // .filter(o => o.data > yesterday)
            .reduce((acc, x) => {
                if (acc.length === 0) {
                    acc.push(x)
                } else {
                    if (!acc.map(element => element.user).includes(x.user)) {
                        acc.push(x)
                    } else {
                        const saved = acc.find((obj) => obj.user === x.user);
                        if(saved.data < x.data) {
                            const index = acc.indexOf(saved);
                            acc.splice(index, 1);
                            acc.push(x);
                        }
                    }
                }
                return acc
            }, []);

        populateList($("#week-orders"), data.map(o => userAndFoods(o)));
    });
};