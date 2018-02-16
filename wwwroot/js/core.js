function initIndex() {
    link(null, $('#container'));
}

function initMenu() {
    getMenu().then(data => {
        data = JSON.parse(data);

        const pizzas = data.pizzas.sort(foodSorter);
        const supplements = data.supplements.sort(foodSorter);
        const dough = data.dough.sort(foodSorter);
        const food = data.food.sort(foodSorter);
        const sandwiches = data.sandwiches.sort(foodSorter);
        const desserts = data.desserts.sort(foodSorter);

        populateTable($("#pizzas tbody"), pizzas.map(p => p.food), pizzas.map(p => p.price.toFixed(2) + ' &euro;'));
        populateTable($("#supplements tbody"), supplements.map(s => s.food), supplements.map(s => s.price.toFixed(2) + ' &euro;'));
        populateTable($("#dough tbody"), dough.map(d => d.food), dough.map(d => d.price.toFixed(2) + ' &euro;'));
        populateTable($("#dough tbody"), food.map(f => f.food), food.map(f => f.price.toFixed(2) + ' &euro;'));
        populateTable($("#sandwiches tbody"), sandwiches.map(s => s.food), sandwiches.map(s => s.price.toFixed(2) + ' &euro;'));
        populateTable($("#desserts tbody"), desserts.map(d => d.food), desserts.map(d => d.price.toFixed(2) + ' &euro;'));
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