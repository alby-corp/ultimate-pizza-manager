import {Common} from './common';

export const OrderDao = (function () {

    const privateProps = new WeakMap();

    return class extends Common.Order {

        constructor(context, user, foods, date) {
            super(user, foods, date);

            privateProps.set(this, {
                context: context
            });


            this.save = () => privateProps.get(this).context.insertOrder(this);
        };
    };


})();

