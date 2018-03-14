const common = require('../wwwroot/js/common');
const context = require('./data-layer');

class Order extends common.Order {

    constructor(user, foods, data){
        super(user, foods, data);
    }

    Save(){
        return context.insertOrders(this);
    }
}

module.exports.Order = Order;