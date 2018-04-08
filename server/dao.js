const common = require("../wwwroot/js/common");
const context = require('./data-layer');

class OrderDao extends common.Order{

    constructor(user, foods, data){
        super(user, foods, data);
    }

    save(){
        return context.insertOrders(this);
    }
}

module.exports.OrderDAO = OrderDao;