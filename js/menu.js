function pupulateMenu() {
    const pizze = $("#pizze table tbody");
    const supplementi = $("#supplementi table tbody");
    const impasti = $("#impasti table tbody");
    const cucina = $("#cucina table tbody");
    const panini = $("#panini table tbody");
    const dolci = $("#dolci table tbody");

    get("menu").then(content => {
        content = JSON.parse(content);

        populateTable(content.pizze, pizze);
        populateTable(content.supplementi, supplementi);
        populateTable(content.impasti, impasti);
        populateTable(content.cucina, cucina);
        populateTable(content.panini, panini);
        populateTable(content.dolci, dolci);
    });
}


