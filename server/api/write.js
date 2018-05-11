const dao = require('../model/dao');
const common = require('../../app/model/common');

module.exports = {
    insertOrder: async (req, res) => {

        const user = new common.User(+req.body.user.id);
        const foods = req.body.foods.map(f => new common.OrderedFood(new common.Food(+f.id), f.supplements, f.removals));

        const order = new dao.OrderDAO(user, foods);

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
        res.send('OK!');
    }
};

