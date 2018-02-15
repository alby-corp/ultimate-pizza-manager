function link(page, containerName) {
    let container = $("#" + containerName);
    container.empty();

    switch (page) {
        case "menu":
            populateContainer("menu.html", container);
            break;
        default:
            populateContainer("order.html", container);
    }
}

function populateTable(data, table) {
    for (let item of data) {
        table.append('<tr><td scope="row">' + item.cibo + '</td><td scope="row">' + item.prezzo.toFixed(2) + ' &euro;</td></tr>');
    }
}

function populateContainer(page, container) {
    get(page).then(content => {
        container.html(content);
    });
}

function populateDropDown(ddl) {
    get("menu").then(content => {
        content = JSON.parse(content);

        for (let pizza of content.pizze) {
            ddl.append('<option value="' + pizza.cibo + '">' + capitalizeFirstLetter(pizza.cibo) + '</option>')
        }
    });
}

function pizzaSorter(a, b) {
    if (a.cibo < b.cibo) return -1;
    if (a.cibo > b.cibo) return 1;
    return 0;
}

function capitalizeFirstLetter(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}