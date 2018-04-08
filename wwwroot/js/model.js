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

            if (!(Array.isArray(rows) || rows.filter(row => !(row instanceof BaseRow)).length > 0)){
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
    render(){
        throw new Error("Render is abstract method");
    }
}

const OrdersRow = (function () {

    const privateProps = new WeakMap();

    class OrdersRow extends BaseRow {

        constructor(user, foods, total) {
            super();

            privateProps.set(this,  {
                user: user,
                foods: foods,
                total: total
            });
        }

        render() {
            return `<tr><td>${privateProps.get(this).user}</td><td><table>${privateProps.get(this).foods.map(food => {
                return `  <tr><td>${food.name}</td><td><table>${food.supplements.map(s => {
                    return `<tr><td>${s.name}</td></tr>`
                }).join('')}</table></td><td><table>${food.removals.map(r => {
                    return `<tr><td>${r.name}</td></tr>`
                }).join('')}</table></td></tr>`
            }).join('')}</table></td><td>${privateProps.get(this).total}</td></tr>`;
        }
    }

    return OrdersRow;
})();

const SummaryRow = (function () {

    const privateProps = new WeakMap();

    class SummaryRow extends BaseRow {

        constructor(food, total) {
            super();

            privateProps.set(this,  {
                food: food,
                total: total
            });
        }

        render() {
            return `<tr><td>${privateProps.get(this).food}</td><td></td></tr>`;
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

