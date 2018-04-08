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
    }

    return Table;
})();

class BaseRow {
    render() {
        throw new Error("Render is abstract method");
    }
}

const OrdersRow = (function () {

    const privateProps = new WeakMap();

    class OrdersRow extends BaseRow {

        constructor(order) {
            super();

            privateProps.set(this, {
                user: order.user.name,
                foods: order.foods,
                total: order.total()
            });
        }

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
    }

    return OrdersRow;
})();

const SummaryRow = (function () {

    const privateProps = new WeakMap();

    class SummaryRow extends BaseRow {

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
                        <td>${this.orderedFood.food.name}</td>
                        <td><ol>${this.orderedFood.supplements.map(s => `<li>${s.name}</li>`).join('')}</ol></td>
                        <td><ol>${this.orderedFood.removals.map(r => `<li>${r.name}</li>`).join('')}</ol></td>
                        <td>${this.count}</td>
                    </tr>`;
        }
    }

    return SummaryRow;
})();

const Order = class Order extends AlbyJs.Common.Order {
    constructor(user, foods, data) {
        super(user, foods, data);
    }

    toDTO() {
        return new OrderDTO(this);
    }

};

