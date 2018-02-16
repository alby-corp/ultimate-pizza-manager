function initIndex() {
    link(null, $('#container'));
}

function initMenu() {
    getMenu().then(data => {
        data = JSON.parse(data);

        data.pizzas.sort(foodSorter);
        data.supplements.sort(foodSorter);
        data.dough.sort(foodSorter);
        data.food.sort(foodSorter);
        data.sandwiches.sort(foodSorter);
        data.desserts.sort(foodSorter);

        populateTable($("#pizzas tbody"), pizzas.map(p => p.food), pizzas.map(p => price(p)));
        populateTable($("#supplements tbody"), supplements.map(s => s.food), supplements.map(s => price(s)));
        populateTable($("#dough tbody"), dough.map(d => d.food), dough.map(d => price(d)));
        populateTable($("#dough tbody"), food.map(f => f.food), food.map(f => price(f)));
        populateTable($("#sandwiches tbody"), sandwiches.map(s => s.food), sandwiches.map(s => price(s)));
        populateTable($("#desserts tbody"), desserts.map(d => d.food), desserts.map(d => price(d)));
    });
}

function initOrders() {
    getMenu().then(data => {
        data = JSON.parse(data);

        populateDropDown($("#pizza"), data.pizzas.sort(foodSorter).map(p => foodAndPrice(p)));
        populateDropDown($("#food"), data.food.sort(foodSorter).map(f => foodAndPrice(f)));
        populateDropDown($("#sandwiches"), data.sandwiches.sort(foodSorter).map(s => foodAndPrice(s)));
        populateDropDown($("#desserts"), data.desserts.sort(foodSorter).map(d => foodAndPrice(d)));

        populateCheckBoxList($("#supplements"), data.supplements.map(s => foodAndPrice(s)));
        populateCheckBoxList($("#dough"), data.dough.map(d => foodAndPrice(d)));
    });
}