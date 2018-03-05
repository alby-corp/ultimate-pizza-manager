// Documentation:
// 1) https://stackoverflow.com/questions/22156326/private-properties-in-javascript-es6-classes;
// 2) https://coryrylan.com/blog/javascript-es6-class-syntax;

const Food = (function () {
    const privateProps = new WeakMap();

    class Food {
        constructor(id, name, price, ingredients, type) {
            privateProps.set(this, {
                id: id,
                name: name,
                price: price,
                ingredients: ingredients,
                type: type
            });
        };

        get id() {
            return privateProps.get(this).id;
        };

        get name() {
            return privateProps.get(this).name;
        }

        get price() {
            return privateProps.get(this).price;
        }

        get ingredients() {
            return privateProps.get(this).ingredients;
        }

        get type() {
            return privateProps.get(this).type;
        }

        toString() {
            return `${privateProps.get(this).name} - ${privateProps.get(this).price}`;
        };
    }

    return Food;
})();

const User = (function () {
    const privateProps = new WeakMap();

    class User {
        constructor(id, name) {
            privateProps.set(this, {
                id: id,
                name: name
            });
        };

        get id() {
            return privateProps.get(this).id;
        };

        get name() {
            return privateProps.get(this).name;
        }
    }

    return User;
})();

const Ingredient = (function () {
    const privateProps = new WeakMap();

    class Ingredient {
        constructor(id, name, price) {
            privateProps.set(this, {
                id: id,
                name: name,
                price: price
            });
            this.isRemoval;
        };

        get id() {
            return privateProps.get(this).id;
        };

        get name() {
            return privateProps.get(this).name;
        }

        toString() {
            return privateProps.get(this).price === undefined ? `${privateProps.get(this).name}` : `${privateProps.get(this).name} - ${privateProps.get(this).price}`;
        };
    }

    return Ingredient;
})();

const Order = (function () {

    class Order {
        constructor(user, foods, ingredients, data) {
            this.user = user === undefined ? '' : user;
            this.foods = foods === undefined ? [] : foods;
            this.ingredients = ingredients === undefined ? [] : ingredients;
            this.data = data;
        }
    }

    return Order;
})();