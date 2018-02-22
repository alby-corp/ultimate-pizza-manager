const proto = {
    /**
     * @return {string}
     */
    GetPrice: function () {
        return `${this.price.toFixed(2)}`;
    }
};

function Food(id, name, price, ingredients, type) {

    this.id = id;
    this.name = name === undefined ? '' : name;
    this.price = price === undefined ? 0 : price;
    this.ingredients = ingredients;

    if (type === undefined) {
        throw "Type have to be declared";
    }

    this.type = type
}


Food.prototype = proto;

function Ingredient(id, name, price, isSupplement) {
    this.id = id;
    this.name = name === undefined ? '' : name;
    this.price = price === undefined ? 0 : undefined;
}

Ingredient.prototype = proto;

function Order(user, pizza, kitchen, sandwich, dessert, dough, supplements) {

    this.user = user;
    this.pizza = new Food(pizza.id, pizza.name, pizza.price, pizza.ingredients);
    this.kitchen = new Food(kitchen.id, kitchen.name, kitchen.price, kitchen.ingredients);
    this.sandwich = new Food(sandwich.id, sandwich.name, sandwich.price, sandwich.ingredients);
    this.dessert = new Food(dessert.id, dessert.name, dessert.price, dessert.ingredients);
    this.dough = new Food(dough.id, dough.name, dough.price, dough.ingredients);


Order.prototype = {
    getTotal: function () {
        return this.pizza.price + this.kitchen.price + this.sandwich.price + this.dessert.price + this.dough.price + this.supplements.reduce((acc, element) => (acc + element), 0)
    },
    toString: function () {
        return `User: ${this.user} - Pizza: ${this.pizza.food} - Piatto: ${this.kitchen.food} - Panino: ${this.sandwich.food} Dolce: - ${this.dessert.food} - Impasto: ${this.dough.food}, Supplementi: ${this.supplements.map(s => s.food).join()}`;
    }
};

