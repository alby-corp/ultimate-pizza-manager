const common = require("../../app/model/common");
const ultimatePizzaManagerContext = require('../data-layer/ultimatePizzaManagerContext');

class OrderDao extends common.Order{

    constructor(user, foods, data){
        super(user, foods, data);
    }

    save(){
        return ultimatePizzaManagerContext.insertOrders(this);
    }
}

module.exports.OrderDAO = OrderDao;