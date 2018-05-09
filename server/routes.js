const express = require("express");
const routes = express.Router();

const readCtrl = require("./controllers/read.controller.js");
const writeCtrl = require("./controllers/write.controller.js");

routes.route('/users')
    .get((req, res) => readCtrl.getUsers(res));

routes.route('/foods')
    .get((req, res) => readCtrl.getFoods(res));

routes.route('/supplements')
    .get((req, res) => readCtrl.getSupplements(res));

routes.route('/administrators')
    .get((req, res) => readCtrl.getAdministrators(res));

routes.route('/orders')
    .get((req, res) => readCtrl.getOrders(res))
    .post((req, res) => writeCtrl.insertOrder(req, res));

module.exports = routes;