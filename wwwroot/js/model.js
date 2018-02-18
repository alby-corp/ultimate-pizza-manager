function FoodAndPrice(f, p) {
    this.food = f;
    this.price = p;
}

FoodAndPrice.prototype = {
    toString: function () {
        return `${this.price.toFixed(2)} &euro; - ${capitalizeFirstLetter(this.food)}`;
    }
};

function Order(u, p, f, s, d) {
    this.user = u;
    this.pizza = p === undefined ? {food : "", price : 0} : p;
    this.food = f === undefined ? {food : "", price : 0} : f;
    this.sandwiche = s === undefined ? {food : "", price : 0} : s;
    this.dessert = d === undefined ? {food : "", price : 0} : d;
}

Order.prototype = {
    toString: function () {
        return `${this.user} - ${this.pizza.food} - ${this.food.food} - ${this.sandwiche.food} - ${this.dessert.food} - Totale: ${this.pizza.price + this.food.price + this.sandwiche.price + this.dessert.price} &euro;`;
    }
};

function KeyValuePairModel(obj) {
    this.key = obj.id;
    this.value = new FoodAndPrice(obj.food, obj.price);
}

function ListModel(obj) {
    this.value = new Order(obj.user, obj.pizza, obj.food, obj.sandwiche, obj.dessert);
}



