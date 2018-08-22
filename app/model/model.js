import {Common} from '../../server/model';
import {OrderDTO} from './dto';

export const DropDownList = (function () {
    const privateProps = new WeakMap();

    return class {
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
            master.change(() => {

                const m = master.val();

                privateProps.get(this).select.prop("disabled", m === '')});

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
    };
})();

export const Option = (function () {
    const privateProps = new WeakMap();

    return class {
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
    };

})();

export const Table = (function () {
    const privateProps = new WeakMap();

    return class {
        constructor(table, rows) {

            if (!(Array.isArray(rows) || rows.filter(row => !(row instanceof BaseRow)).length > 0)) {
                throw 'Rows has to be an Array of BaseRow';
            }

            privateProps.set(this, {
                table: table,
                rows: rows
            });
        }

        populate() {
            privateProps.get(this).rows.forEach(row => privateProps.get(this).table.children('tbody').append(row.render()));
        }
    };

})();

class BaseRow {
    render() {
        throw new Error("Render is abstract method");
    }
}

export const OrdersRow = (function () {

    const privateProps = new WeakMap();

    return class extends BaseRow {

        constructor(number, order) {
            super();

            privateProps.set(this, {
                number: number + 1,
                user: order.user.name,
                foods: order.foods,
                total: `${order.total().toFixed(2)} &euro;`
            });
        }

        get number() {
            return privateProps.get(this).number;
        };

        get user() {
            return privateProps.get(this).user;
        };

        get foods() {
            return privateProps.get(this).foods;
        };

        get total() {
            return privateProps.get(this).total;
        };

        render() {

            const rowspan = this.foods.length;

            const firstFood = _.first(this.foods);
            const otherFoods = _.without(this.foods, _.findWhere(this.foods, firstFood));

            return `<tr>
                        <td rowspan="${rowspan}">${this.number}</td>
                        <td rowspan="${rowspan}">${this.user}</td>
                        <td>${firstFood.food.toString()}</td>
                        <td><ul>${firstFood.supplements.map(s => `<li>${s.toString()}</li>`).join('')}</ul></td>
                        <td><ul>${firstFood.removals.map(r => `<li>${r.name}</li>`).join('')}</ul></td>
                        <td rowspan="${rowspan}">${this.total}</td>
                    </tr>

                    ${otherFoods.map(orderedFood => `<tr>
                                                        <td>${orderedFood.food.toString()}</td>
                                                        <td><ul>${orderedFood.supplements.map(s => `<li>${s.toString()}</li>`).join('')}</ul></td>
                                                        <td><ul>${orderedFood.removals.map(r => `<li>${r.name}</li>`).join('')}</ul></td>
                                                    </tr>`)}`;
        }
    };

})();

export const FoodRow = (function () {

    const privateProps = new WeakMap();

    return class extends BaseRow {

        constructor(food) {
            super();

            privateProps.set(this, {
                food: food
            });
        }

        get food() {
            return privateProps.get(this).food;
        };

        render() {
            let row = `<tr><td>${this.food.name}</td><td>${this.food.price.toFixed(2)} &euro;</td>`;
            if (this.food.ingredients.length > 0){
                row = row.concat(`<td>${this.food.ingredients.map(ingredient => ingredient.name).join(', ')}</td>`);
            }

            return row.concat('</tr>');
        }
    };

})();

export const IngredientRow = (function () {

    const privateProps = new WeakMap();

    return class extends BaseRow {

        constructor(ingredient) {
            super();

            privateProps.set(this, {
                ingredient: ingredient
            });
        }

        get ingredient() {
            return privateProps.get(this).ingredient;
        };

        render() {
            return `<tr><td>${this.ingredient.name}</td><td>${this.ingredient.price.toFixed(2)} &euro;</td>`;
        }
    };

})();

export const SummaryRow = (function () {

    const privateProps = new WeakMap();

    return class extends BaseRow {

        constructor(orderedFood, count) {
            super();

            privateProps.set(this, {
                orderedFood: orderedFood,
                count: count
            });
        }

        get orderedFood() {
            return privateProps.get(this).orderedFood;
        };

        get count() {
            return privateProps.get(this).count;
        };

        render() {
            return `<tr>    
                        <td>${this.count}</td>
                        <td>${this.orderedFood.food.name}</td>
                        <td><ul>${this.orderedFood.supplements.map(s => `<li>${s.name}</li>`).join('')}</ul></td>
                        <td><ul>${this.orderedFood.removals.map(r => `<li>${r.name}</li>`).join('')}</ul></td>
                    </tr>`;
        }
    };

})();

export const Span = (function () {

    const privateProps = new WeakMap();

    return class {

        constructor(span, text) {
            privateProps.set(this, {
                span: span,
                text: text
            });
        }

        get span() {
            return privateProps.get(this).span;
        };

        get text() {
            return privateProps.get(this).text;
        };

        populate() {
            this.span.html(this.text);
        }
    };

})();

export const List = (function () {

    const privateProps = new WeakMap();

    return class {

        constructor(list, items) {

            if (!(Array.isArray(items) || items.filter(row => !(row instanceof BaseListItem)).length > 0)) {
                throw 'Items has to be an Array of BaseListItem';
            }

            privateProps.set(this, {
                list: list,
                items: items
            });
        }

        get list() {
            return privateProps.get(this).list;
        };

        get items() {
            return privateProps.get(this).items;
        };

        populate() {
            this.items.forEach(item => this.list.append(item.render()))
        }
    };

})();

class BaseListItem {
    render() {
        throw new Error("Render is abstract method");
    }
}

export const AdminListItem = (function () {

    const privateProps = new WeakMap();

    return class extends BaseListItem {

        constructor(admin) {
            super();

            privateProps.set(this, {
                admin: admin
            });
        }

        get admin() {
            return privateProps.get(this).admin;
        }

        render() {
            return `<li class="list-group-item">${this.admin.name} ${this.admin.onHoliday ? ` &egrave; in ferie` : ``} </li>`;
        }
    };

})();

export const Button = (function () {
    const privateProps = new WeakMap();

    return class {
        constructor(value, attrs) {
            privateProps.set(this, {
                value: value
            });
            this.attrs = attrs;
        }

        get value() {
            return privateProps.get(this).value;
        }

        render() {
            let attrs = '';
            for (let [key, value] of this.attrs.entries()) {
                attrs += `${key} ="${value}" `;
            }

            return `<button ${attrs} >${this.value}</button>`;
        }
    };

})();

export class Order extends Common.Order {
    constructor(user, foods, data) {
        super(user, foods, data);
    }

    toDTO() {
        return new OrderDTO(this);
    }
}

