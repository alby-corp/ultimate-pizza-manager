export const Common = (function () {
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

    const Administrator = (function () {
        const privateProps = new WeakMap();

        class Administrator {
            constructor(name, onHoliday) {
                privateProps.set(this, {
                    name: name,
                    onHoliday: onHoliday
                });
            };

            get name() {
                return privateProps.get(this).name;
            };

            get onHoliday() {
                return privateProps.get(this).onHoliday;
            }
        }

        return Administrator;
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
                return this.price === undefined ? `${this.name}` : `${this.name} - ${this.price !== null ? this.price.toFixed(2) : 'N/A'} &euro;`;
            };
        }

        return Ingredient;
    })();

    const Food = (function () {
        const privateProps = new WeakMap();

        class Food {

            constructor(id, name, price, ingredients, type, description) {

                try {
                    ingredients = (ingredients || []).map(i => new Ingredient(i.id, i.name, i.price));
                } catch (error) {
                    throw new Error(`Invalid ingredients array: ${error.message}`)
                }

                privateProps.set(this, {
                    id: id,
                    name: name,
                    price: +price,
                    ingredients: ingredients,
                    type: type,
                    description: description
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

            get description() {
                return privateProps.get(this).description;
            };

            toString() {
                return `${this.name} - ${this.price.toFixed(2)} &euro;`;
            };
        }

        return Food;
    })();

    const OrderedFood = (function () {
        const privateProps = new WeakMap();

        class OrderedFood {

            constructor(food, supplements, removals) {

                try {
                    supplements = (supplements ? supplements : []).map(i => new Ingredient(i.id, i.name, i.price));
                } catch (error) {
                    throw new Error(`Invalid supplements array: ${error.message}`)
                }

                try {
                    removals = (removals ? removals : []).map(i => new Ingredient(i.id, i.name, i.price));
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

            total() {
                return +this.food.price + this.supplements.reduce((acc, supplement) => acc += supplement.price, 0);
            }
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
                    foods = (foods || []).map(orderedFood => new OrderedFood(new Food(orderedFood.food.id, orderedFood.food.name, orderedFood.food.price, orderedFood.food.ingredients, orderedFood.food.type, orderedFood.food.description), orderedFood.supplements, orderedFood.removals));
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
                return +this.foods.reduce((acc, orderedFood) => acc += orderedFood.total(), 0);
            }
        }

        return Order;
    })();

    return {
        User: User,
        Food: Food,
        Ingredient: Ingredient,
        OrderedFood: OrderedFood,
        Order: Order,
        Administrator: Administrator
    };

})();
