function initIndex(){
    link(null, $('#container'));
}

function initMenu(){
    getMenu().then(data => {
        data = JSON.parse(data);

        populateTable(data.pizze, $("#pizze tbody"));
        populateTable(data.supplementi, $("#supplementi tbody"));
        populateTable(data.impasti, $("#impasti tbody"));
        populateTable(data.cucina, $("#cucina tbody"));
        populateTable(data.panini, $("#panini tbody"));
        populateTable(data.dolci, $("#dolci tbody"));
    });
}

function  initOrders() {
    getMenu().then(data => {
        data = JSON.parse(data);

        populateDropDown(data.pizze, $("#pizza"));
    });
}