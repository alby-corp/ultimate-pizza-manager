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

function Order(user, pizza, food, sandwiche, dessert, dough, supplements, total) {

    this.blank = {food: "", price: 0};
    this.user = user;
    this.pizza = pizza === undefined ? this.blank : pizza;
    this.food = food === undefined ? this.blank : food;
    this.sandwiche = sandwiche === undefined ? this.blank : sandwiche;
    this.dessert = dessert === undefined ? this.blank : dessert;
    this.dough = dough === undefined ? this.blank : dough;
    this.supplements = supplements === undefined ? [] : supplements;
    this.total = total;

}

Order.prototype = {
    toString: function () {
        return `${this.user} - ${this.pizza.food} - ${this.food.food} - ${this.sandwiche.food} - ${this.dessert.food} - ${this.dough.food}, ${this.supplements.map(s => s.food).join()} - Totale: ${this.total} &euro;`;
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
    this.value = new Order(obj.user, obj.pizza, obj.food, obj.sandwiche, obj.dessert, obj.dough, obj.supplements, obj.total);
}




