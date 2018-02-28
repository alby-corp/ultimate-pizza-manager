class Helpers {
    static populateContainer(data, container) {
        container.html(data);
    }

    static populateDropDown(ddl, options) {

        for (let option of options) {
            ddl.append(option.render())
        }
    };

    static enableConditionalDDL(mainDDL, conditionalDDL) {
        mainDDL.change(() => conditionalDDL.prop("disabled", mainDDL.val() === "null"));
    };

    static optionalPopulateDropDown(mainDDL, conditionalDDL) {
        mainDDL.change(() => {

        });
    };
}

// Populate Elements


populateList = (list, data) => {

    for (let item of data) {
        list.append(`<li>${item.value.toString()}</li>`);
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

// Sorting
optionsSorter = (firstItem, secondItem) => {
    if (firstItem.key < secondItem.key) return -1;
    if (firstItem.key > secondItem.key) return 1;
    return 0;
};