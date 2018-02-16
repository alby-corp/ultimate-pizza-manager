function initIndex(){
    link(null, $('#container'));
}

function initMenu(){
    getMenu().then(data => {
        data = JSON.parse(data);

        populateTable(data.pizze.sort(foodSorter), $("#pizze tbody"));
        populateTable(data.supplementi.sort(foodSorter), $("#supplementi tbody"));
        populateTable(data.impasti.sort(foodSorter), $("#impasti tbody"));
        populateTable(data.cucina.sort(foodSorter), $("#cucina tbody"));
        populateTable(data.panini.sort(foodSorter), $("#panini tbody"));
        populateTable(data.dolci.sort(foodSorter), $("#dolci tbody"));
    });
}

function  initOrders() {
    getMenu().then(data => {
        data = JSON.parse(data);

        populateDropDown(data.pizzas.map(pizza => pizza.food), $("#pizza"));
        populateDropDown(data.food.map(food => food.food), $("#food"));
        populateDropDown(data.sandwiches.map(sandwiche => sandwiche.food), $("#sandwiches"));
        populateDropDown(data.desserts.map(dessert => dessert.food), $("#desserts"));
    });
}