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
        table.append('<tr><th scope="row">' + item.cibo + '</th><td>' + item.prezzo.toFixed(2) + ' &euro;</td></tr>');
    }
}

function populateContainer(page, container){
    get(page).then(content => {
        container.html(content);
    });
}