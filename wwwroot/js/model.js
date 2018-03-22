// Documentation:
// 1) https://stackoverflow.com/questions/22156326/private-properties-in-javascript-es6-classes;
// 2) https://coryrylan.com/blog/javascript-es6-class-syntax;

const DropDownList = (function () {
    const privateProps = new WeakMap();

    class DropDownList {
        constructor(select, options) {
            privateProps.set(this, {
                select: select,
                options: options
            });
        };

        populate() {
            privateProps.get(this).select.empty();
            for (let option of privateProps.get(this).options) {
                privateProps.get(this).select.append(option.render())
            }

            return this;
        };

        conditionalEnable(master) {
            master.change(() => privateProps.get(this).select.prop("disabled", master.val() === ''));

            return this;
        };

        autoRefresh(master, func) {
            master.change(() => {

                const id = master.val();

                privateProps.get(this).options = func(id);
                this.populate();
            });

            return this;
        }
    }

    return DropDownList;
})();

const Option = (function () {
    const privateProps = new WeakMap();

    class Option {
        constructor(key, value, selected, disabled) {
            privateProps.set(this, {
                key: key,
                value: value,
                disabled: disabled
            });
        };

        get key() {
            return privateProps.get(this).key
        };

        get value() {
            return privateProps.get(this).value;
        }

        render() {
            const value = privateProps.get(this).key;
            return `<option value=${ value !== undefined ? value : '' } ${ privateProps.get(this).disabled ? 'disabled' : ''}>${ privateProps.get(this).value}</option>`;
        };

        static getBlankOption() {
            return new Option(undefined, ' -- -- ', false);
        };
    }

    return Option;
})();

const Table = (function () {
    const privateProps = new WeakMap();

    class Table {
        constructor(table, orders) {
            privateProps.set(this, {
                table: table,
                orders: orders
            });
        }

        populate() {
            privateProps.get(this).table.children('tbody').append(privateProps.get(this).orders.map(order => new Row(order.user, order.foods).render()));
        }
    }

    return Table;
})();

const Row = (function () {
    const privateProps = new WeakMap();

    class Row {
        constructor(user, foods) {
            privateProps.set(this, {
                user: user,
                foods: foods
            });
        }

        // render() {
        //     return `<tr><td>${privateProps.get(this).user}</td>
        //                 <td><table>${privateProps.get(this).foods.map(food => `<tr><td>${food.name}</td></tr>`).join('')}
        //                 </table></td>
        //             </tr>`;
        // }



            render() {
                return `<tr><td>${privateProps.get(this).user}</td>
                            <td><table>${privateProps.get(this).foods.map(food => { return `<tr><td>${food.name}</td>
                                                                                           <td><table>${food.supplements.map(s => { return `<tr><td>${s.name}</td></tr>`}).join('')}</table></td>
                                                                                           <td><table>${food.removals.map(r => { return `<tr><td>${r.name}</td></tr>`}).join('')}</table></td>
                                                                                       </tr>`}).join('')
                            }</table></td>
                        </tr>`;
            }
    }

    return Row;
})();

const Order = class Order extends AlbyJs.Common.Order {
    constructor(user, foods, data) {
        super(user, foods, data);
    }

    toDTO() {
        return new OrderDTO(this.user, this.foods, this.data);
    }
};

const Food = class Food extends AlbyJs.Common.Food {
    constructor(id, name, price, ingredients, type, supplements, removals) {
        super(id, name, price, ingredients, type, supplements, removals)
    }

    toDTO() {
        return new FoodDTO(this.id, this.name, this.ingredients, this.price, this.type, this.supplements, this.removals);
    }
};

const Ingredient = class Ingredient extends AlbyJs.Common.Ingredient {
    constructor(id, name, price) {
        super(id, name, price);
    }

    toDTO() {
        return new IngredientDTO(this.id, this.name, this.price);
    }
};

const User = class User extends AlbyJs.Common.User {
    constructor(id, name) {
        super(id, name);
    }

    toDTO() {
        return new UserDTO(this.id, this.name);
    }
};
