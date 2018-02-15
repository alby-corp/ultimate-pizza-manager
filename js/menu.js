function pupulateMenu() {
    const pizze = $("#pizze tbody");
    const supplementi = $("#supplementi tbody");
    const impasti = $("#impasti tbody");
    const cucina = $("#cucina tbody");
    const panini = $("#panini tbody");
    const dolci = $("#dolci tbody");

    get("menu").then(content => {
        content = JSON.parse(content);

        populateTable(content.pizze.sort(pizzaSorter), pizze);
        populateTable(content.supplementi.sort(pizzaSorter), supplementi);
        populateTable(content.impasti.sort(pizzaSorter), impasti);
        populateTable(content.cucina.sort(pizzaSorter), cucina);
        populateTable(content.panini.sort(pizzaSorter), panini);
        populateTable(content.dolci.sort(pizzaSorter), dolci);
    });
}


