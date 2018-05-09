const upmContext = require('../data-layer/ultimatePizzaManagerContext');
const Helpers = require('../helpers/helpers');

module.exports = {
    getFoods: async (res) => await Helpers.makeResponse(res, upmContext.getFoods),
    getUsers: async (res) => await Helpers.makeResponse(res, upmContext.getUsers),
    getSupplements: async (res) => await Helpers.makeResponse(res, upmContext.getSupplements),
    getOrders: async (res) => await Helpers.makeResponse(res, upmContext.getOrders),
    getAdministrators: async (res) => await Helpers.makeResponse(res, upmContext.getAdministrators)
};
