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
