// Pupulate Elements

function populateContainer(data, container) {
    container.html(data);
}

function populateDropDown(data, ddl) {

    ddl.append('<option>-</option>')

    for (let item of data) {
        ddl.append('<option value="' + item + '">' + capitalizeFirstLetter(item) + '</option>')
    }
}

function populateTable(table, ...args) {
    const transpose = column => column[0].map((_,i) => column.map(row => row[i]))

    table.append(`${transpose(args).map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}`);
}

// Strings Helpers
function capitalizeFirstLetter(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

// Sorting area
function foodSorter(a, b) {
    if (a.food < b.food) return -1;
    if (a.food > b.food) return 1;
    return 0;
};
