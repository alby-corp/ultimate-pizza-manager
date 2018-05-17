import {Common, OrderDao} from '../model';

export const WriteController = (function () {

    const privateProps = new WeakMap();

    return class WriteController {

        constructor(context) {
            privateProps.set(this, {
                context: context
            });
        };

        async insertOrder(req, res) {

            const user = new Common.User(+req.body.user.id);
            const foods = req.body.foods.map(f => new Common.OrderedFood(new Common.Food(+f.id), f.supplements, f.removals));

            const order = new OrderDao(privateProps.get(this).context, user, foods);

            try {
                order.validate();
            } catch (error) {
                res.status(400);
                res.send(`Ordine non valido si prega di riprovare. Magari utilizzando il client messo a disposizione e non postman o simili! : ${error}`);
            }

            try {
                await order.save();
            } catch (error) {
                res.status(503);
                res.send(`Impossibile salvare l'ordine: ${error.message}`);
            }

            res.status(201);
            res.send('Created!');
        }
    }
})();

