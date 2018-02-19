function Food(f, p) {
    this.food = f;
    this.price = p;
}

Food.prototype = {
    toString: function () {
        return `${this.price.toFixed(2)} &euro; - ${capitalizeFirstLetter(this.food)}`;
    },
    getFood: function () {
        return `${capitalizeFirstLetter(this.food)}`;
    }
};

function Order(u, p, f, s, d, i, su) {
    this.user = u;
    this.pizza = p === undefined ? {food: "", price: 0} : p;
    this.food = f === undefined ? {food: "", price: 0} : f;
    this.sandwiche = s === undefined ? {food: "", price: 0} : s;
    this.dessert = d === undefined ? {food: "", price: 0} : d;
    this.dough = i === undefined ? {food: "", price: 0} : i;
    this.supplements = su === undefined ? [] : su;
}

Order.prototype = {
    toString: function () {
        return `${this.user} - ${this.pizza.food} - ${this.food.food} - ${this.sandwiche.food} - ${this.dessert.food} - ${this.dough.food}, ${this.supplements.map(s => s.food).join()} - Totale: ${this.pizza.price + this.food.price + this.sandwiche.price + this.dessert.price + this.dough.price + this.supplements.map(s => s.price).reduce((a, b) => a + b, 0)} &euro;`;
    }
};

function Menu(obj) {
    this.food = obj.food;
    this.price = obj.price;
    this.ingredients = obj.ingredients;
}

Menu.prototype = {
    getPrice: function () {
        return `${this.price.toFixed(2)} &euro;`;
    }
};

function TableModel(h, b) {
    this.header = h;
    this.body = b.map(m => new Menu(m));
}

function KeyValuePairModel(obj) {
    this.key = obj.id;
    this.value = new Food(obj.food, obj.price);
}

function ListModel(obj) {
    this.value = new Order(obj.user, obj.pizza, obj.food, obj.sandwiche, obj.dessert, obj.dough, obj.supplements);
}




