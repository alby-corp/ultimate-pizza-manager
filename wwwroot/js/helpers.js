// Pupulate Elements
populateContainer = (data, container) => container.html(data);

populateDropDown = (ddl, keyValuePair, func) => {

    ddl.append('<option selected value><span> -- selezionare un opzione -- </span></option>');

    for (let keyValue of keyValuePair) {
        ddl.append(`<option value="${keyValue.key}">${(func.call(keyValue))}</option>`)
    }
};

optionalPopulateDropDown = (conditionalDDL, mainDDL) => {
    mainDDL.change(() => {
        getIngredients(mainDDL.val()).then(is => {
            populateDropDown(conditionalDDL, is.map(i => new KeyValuePairModel(i)), Food.prototype.getFood);
        });
    });
};

populateList = (list, data) => {

    for (let item of data) {
        list.append(`<li>${item.value.toString()}</li>`);
    }
};

enableConditionalDDL = (mainDDL, conditionalDDL) => {
    mainDDL.change(() => conditionalDDL.prop("disabled", mainDDL.val() == '-'));
};

populateCheckBoxList = (cbl, data) => {

    for (let item of data) {

        let checkbox = `<div class="form-check"><input class="form-check-input" type="checkbox" name=${item.key} id=${item.key} value=${item.key}><label class="form-check-label" for=${item.key}>${item.value}</label></div>`;
        cbl.append(checkbox);
    }
};

populateTable = (table, model) => {

    const tds = model.header.map(h => `<td>${h}</td>`);
    table.find("thead").append(`<tr>${tds.join('')}</tr>`);

    for (let item of model.body) {
        let tr = item.ingredients === undefined ? `<tr><td>${item.food}</td><td>${item.getPrice()}</td></tr>` : `<tr><td>${item.food}</td><td>${item.getPrice()}</td><td>${item.ingredients.join()}</td></tr>`;
        table.find("tbody").append(tr);
    }
};

// Strings
capitalizeFirstLetter = str => {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};


// Sorting
foodSorter = (firstFood, secondFood) => {
    if (firstFood.name < secondFood.name) return -1;
    if (firstFood.name > secondFood.name) return 1;
    return 0;
};