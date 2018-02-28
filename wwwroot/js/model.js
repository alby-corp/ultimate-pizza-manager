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
            master.change(() => privateProps.get(this).select.prop("disabled", master.val() === "null"));

            return this;
        };

        autoRefresh(master, func){
            master.change(() => {
                privateProps.get(this).options = func(+master.val());
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
                selected: selected,
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
            return `<option value=${ privateProps.get(this).key} ${ privateProps.get(this).selected ? 'selected' : ''} ${ privateProps.get(this).disabled ? 'disabled' : ''}>${ privateProps.get(this).value}</option>`;
        };

        static getBlankDisabledOption() {
            return new Option(null, '-- ! Selezionare un&#39;Opzione ! --', true, true)
        };

        static getBlankOption() {
            return new Option(null, ' -- -- ', false, false);
        };

    }

    return Option;
})();
