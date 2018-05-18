import {Common, OrderDao} from '../model';

export const WriteController = (function () {

    const privateProps = new WeakMap();

    return class {

        constructor(context) {
            privateProps.set(this, {
                context: context
            });
        };

        insertOrder(body) {

            const user = new Common.User(+body.user.id);
            const foods = body.foods.map(f => new Common.OrderedFood(new Common.Food(+f.id), f.supplements, f.removals));

            const order = new OrderDao(privateProps.get(this).context, user, foods);

            try {
                order.validate();
            } catch (error) {
                // TODO: delete order;
            }

            return async (res) => {

                try {
                    await order.save(this);
                } catch (error) {
                    res.status(503);
                    res.send(`Impossibile salvare l'ordine: ${error.message}`);
                }

                res.status(201);
                res.send('Created!');
            };
        }
    }
})();

