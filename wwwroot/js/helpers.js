// Pupulate Elements

function populateContainer(data, container) {
    container.html(data);
}

function populateDropDown(data, ddl) {
    for (let item of data) {
        ddl.append('<option value="' + item + '">' + capitalizeFirstLetter(item) + '</option>')
    }
}

function populateTable(data, table) {
    for (let item of data) {
        table.append('<tr><td scope="row">' + item.cibo + '</td><td scope="row">' + item.prezzo.toFixed(2) + ' &euro;</td></tr>');
    }
}

// Strings Helpers
function capitalizeFirstLetter(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

// Sorting area
function foodSorter(a, b) {
    if (a.cibo < b.cibo) return -1;
    if (a.cibo > b.cibo) return 1;
    return 0;
};
