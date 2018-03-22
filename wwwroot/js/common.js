// Documentation:
// 1) https://stackoverflow.com/questions/22156326/private-properties-in-javascript-es6-classes;
// 2) https://coryrylan.com/blog/javascript-es6-class-syntax;
(function () {
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
        }

        return Ingredient;
    })();

    const Food = (function () {
        const privateProps = new WeakMap();

        class Food {
            constructor(id, name, price, ingredients, type, supplements, removals) {

                if (!Number.isInteger(id)) {
                    throw new Error('Id has to be a number');
                }

                privateProps.set(this, {
                    id: id,
                    name: name,
                    price: price,
                    ingredients: ingredients === undefined ? [] : ingredients,
                    type: type
                });
                this.removals = supplements || [];
                this.supplements = removals || [];
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
        }

        return Order;
    })();

    const common = {
        User: User,
        Food: Food,
        Ingredient: Ingredient,
        Order: Order
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = common;
    }
    else {
        if (window.AlbyJs === undefined) {
            window.AlbyJs = {};
        }

        window.AlbyJs.Common = common;
    }
})();
