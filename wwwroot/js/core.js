function initIndex(){
    link(null, $('#container'));
}

function initMenu(){
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

function  initOrders() {
    getMenu().then(data => {
        data = JSON.parse(data);

        populateDropDown(data.pizzas.sort(foodSorter).map(pizza => pizza.price.toFixed(2) + '&euro; - ' + pizza.food), $("#pizza"));
        populateDropDown(data.food.sort(foodSorter).map(food => food.price.toFixed(2) + '&euro; - ' + food.food), $("#food"));
        populateDropDown(data.sandwiches.sort(foodSorter).map(sandwiche => sandwiche.price.toFixed(2) + '&euro; - ' + sandwiche.food), $("#sandwiches"));
        populateDropDown(data.desserts.sort(foodSorter).map(dessert => dessert.price.toFixed(2) + '&euro; - ' + dessert.food), $("#desserts"));
    });
}