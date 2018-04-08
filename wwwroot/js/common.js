(function () {
    const toPrice = (value) => (value === undefined || value === null) ? undefined : value.toFixed(2);

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
                    price: toPrice(price)
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
                return this.price ? `${this.name}` : `${this.name} - ${this.price} &euro;`;
            };
        }

        return Ingredient;
    })();

    const Food = (function () {
        const privateProps = new WeakMap();

        class Food {

            constructor(id, name, price, ingredients, type) {

                try {
                    ingredients = (ingredients || []).map(i => new Ingredient(i.id, i.name, i.price));
                } catch (error) {
                    throw new Error(`Invalid ingredients array: ${error.message}`)
                }

                privateProps.set(this, {
                    id: id,
                    name: name,
                    price: toPrice(price),
                    ingredients: ingredients,
                    type: type
                });
            };

            get id() {
                return privateProps.get(this).id;
            };

            get name() {
                return privateProps.get(this).name;
            };

            get price() {
                return privateProps.get(this).price;
            };

            get ingredients() {
                return privateProps.get(this).ingredients;
            };

            get type() {
                return privateProps.get(this).type;
            };

            toString() {
                return `${this.name} - ${this.price} &euro;`;
            };
        }

        return Food;
    })();

    const OrderedFood = (function () {
        const privateProps = new WeakMap();

        class OrderedFood {

            constructor(food, supplements, removals) {

                try {
                    supplements = (supplements || []).map(i => new Ingredient(i.id, i.name, i.price));
                } catch (error) {
                    throw new Error(`Invalid supplements array: ${error.message}`)
                }

                try {
                    removals = (removals || []).map(i => new Ingredient(i.id, i.name, i.price));
                } catch (error) {
                    throw new Error(`Invalid removals array: ${error.message}`)
                }

                privateProps.set(this, {
                    food: food,
                    supplements: supplements,
                    removals: removals
                });
            };

            get food() {
                return privateProps.get(this).food;
            };

            get supplements() {
                return privateProps.get(this).supplements;
            };

            get removals() {
                return privateProps.get(this).removals;
            };
        }

        return OrderedFood
    })();

    const Order = (function () {

        const privateProps = new WeakMap();

        class Order {
            constructor(user, foods, date) {

                try {
                    user = new User(user.id, user.name);
                } catch (error) {
                    throw new Error(`Invalid user: ${error.message}`);
                }

                try {
                    foods = (foods || []).map(orderedFood => new OrderedFood(new Food(orderedFood.food.id, orderedFood.food.name, orderedFood.food.price, orderedFood.food.ingredients, orderedFood.food.type), orderedFood.supplements, orderedFood.removals));
                } catch (error) {
                    throw new Error(`Invalid foods array: ${error.message}`);
                }

                privateProps.set(this, {
                    user: user,
                    foods: foods,
                    date: date
                });
            }

            get user() {
                return privateProps.get(this).user;
            }

            get foods() {
                return privateProps.get(this).foods;
            }

            get date() {
                return privateProps.get(this).date;
            }

            validate() {
                if (this.foods.length < 1) {
                    throw new Error('Select at least one food');
                }

                if (!this.user) {
                    throw new Error('User cannot be undefined or empty');
                }
            }

            total() {
                const total = this.foods.reduce((acc, food) => acc += food.total(), 0);
                return (+total).toFixed(2);
            }
        }

        return Order;
    })();

    const common = {
        User: User,
        Food: Food,
        Ingredient: Ingredient,
        OrderedFood: OrderedFood,
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
