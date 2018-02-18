// Pupulate Elements
populateContainer = (data, container) => container.html(data);

populateDropDown = (ddl, data) => {

    ddl.append('<option>-</option>');

    for (let item of data) {
        ddl.append(`<option value="${item.key}">${(item.value.toString())}</option>`)
    }
};

populateList = (list, data) => {

    for (let item of data) {
        list.append(`<li>${item.value.toString()}</li>`);
    }
};

populateCheckBoxList = (cbl, data) => {

    ValidateKeyValuePairModel(data);

    for (let item of data) {

        let checkbox = `<div class="form-check"><input class="form-check-input" type="checkbox" name=${item.key} id=${item.key} value=${item.key}><label class="form-check-label" for=${item.key}>${item.value}</label></div>`;
        cbl.append(checkbox);
    }
};

populateTable = (table, ...args) => {
    const transpose = (matrix) => Object.keys(matrix[0]).map(function (colIndex) { return matrix.map(function (column) { return column[colIndex]; }); });
    table.append(`${transpose(args).map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}`)
};

// Strings
capitalizeFirstLetter = str => {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};



// Sorting
foodSorter = (a, b) => {
    if (a.food < b.food) return -1;
    if (a.food > b.food) return 1;
    return 0;
};
