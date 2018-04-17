const common = require("../wwwroot/js/common");
const ultimatePizzaManagerContext = require('./ultimatePizzaManagerContext');

class OrderDao extends common.Order{

    constructor(user, foods, data){
        super(user, foods, data);
    }

    save(){
        return ultimatePizzaManagerContext.insertOrders(this);
    }
}

module.exports.OrderDAO = OrderDao;