// Documentation:
// 1) https://stackoverflow.com/questions/22156326/private-properties-in-javascript-es6-classes;
// 2) https://coryrylan.com/blog/javascript-es6-class-syntax;

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

        toDTO() {
            return new UserDTO(this.id, this.name);
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

        toString() {
            return privateProps.get(this).price === undefined ? `${privateProps.get(this).name}` : `${privateProps.get(this).name} - ${privateProps.get(this).price}`;
        };

        toDTO() {
            return new IngredientDTO(this.id, this.name, this.price);
        }
    }

    return Ingredient;
})();

const Food = (function () {
    const privateProps = new WeakMap();

    class Food {
        constructor(id, name, price, ingredients, type) {

            if (!Number.isInteger(id)) {
                throw new Error('Id has to be a number');
            }

            privateProps.set(this, {
                id: id,
                name: name,
                price: price,
                ingredients: ingredients === undefined? [] : ingredients,
                type: type
            });
            this.removals = [];
            this.supplements = [];
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

        toDTO() {
            return new FoodDTO(this.id, this.name, this.ingredients, this.price, this.type, this.supplements, this.removals);
        }
    }

    return Food;
})();

const Order = (function () {

    class Order {
        constructor(user, foods, data) {

            if (foods !== undefined) {
                if (!Array.isArray(foods)) {
                    throw 'Foods property has to be type Array';
                }
            }

            this.user = user;
            this.foods = foods === undefined ? [] : foods;
            this.data = data;
        }

        validate() {
            if (this.foods.length < 1) {
                throw new Error('Select at least one food');
            }

            if (!this.user) {
                throw new Error('User cannot be undefined or empty!');
            }
        }

        toDTO() {
            return new OrderDTO(this.user, this.foods, this.data);
        }
    }

    return Order;
})();

module.exports.Order = Order;
module.exports.Food = Food;
module.exports.Ingredient = Ingredient;
