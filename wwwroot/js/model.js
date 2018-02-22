// function Food(f, p) {
//     this.food = f;
//     this.price = p;
// }
//
// Food.prototype = {
//     toString: function () {
//         return `${this.price.toFixed(2)} &euro; - ${capitalizeFirstLetter(this.food)}`;
//     },
//     getFood: function () {
//         return `${capitalizeFirstLetter(this.food)}`;
//     }
// };
//
// function Menu(obj) {
//     this.food = obj.food;
//     this.price = obj.price;
//     this.ingredients = obj.ingredients;
// }
// Menu.prototype = {
//     getPrice: function () {
//         return `${this.price.toFixed(2)} &euro;`;
//     }
// };

function TableModel(h, b) {
    this.header = h;
    this.body = b.map(m => new Menu(m));
}

function KeyValuePairModel(value) {
    this.key = value.id;
    this.value = value
}

KeyValuePairModel.prototype = {
    toPriceNameString: function () {
        return  `${this.value.GetPrice()} &euro; - ${this.value.name}`
    }
};

function ListModel(obj) {
    this.value = new Order(obj.user, obj.pizza, obj.food, obj.sandwiche, obj.dessert, obj.dough, obj.supplements, obj.total);
}




