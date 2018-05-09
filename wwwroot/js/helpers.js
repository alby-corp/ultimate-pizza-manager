class Helpers {

    static getFoodsOptions(foods, type) {
        const options = foods.filter(food => food.type === type).map(food => new Option(food.id, food.toString(), false));
        options.unshift(Option.getBlankOption());

        return options;
    };

    static getIngredientsOptions(data, func) {
        const options = data.map(s => new Option(s.id, func.call(s), false));
        options.unshift(Option.getBlankOption());

        return options;
    };

    static exception(arr1, arr2) {
        return arr1.filter((e) => arr2.map(a => a.id).indexOf(e.id) === -1)
    };

    static getPropertyDescriptor(obj, key) {
        return Object.getOwnPropertyDescriptor(obj, key) || this.getPropertyDescriptor(Object.getPrototypeOf(obj), key)
    }
}
