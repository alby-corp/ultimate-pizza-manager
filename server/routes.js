const express = require("express");
const routes = express.Router();

const readCtrl = require("./api/read.js");
const writeCtrl = require("./api/write.js");

routes.route('/users')
    .get((req, res) => readCtrl.getUsers(res));

routes.route('/foods')
    .get((req, res) => readCtrl.getFoods(res));

routes.route('/supplements')
    .get((req, res) => readCtrl.getSupplements(res));

routes.route('/administrators')
    .get((req, res) => readCtrl.getAdministrators(res));

routes.route('/orders')
    .post((req, res) => writeCtrl.insertOrder(req, res))
    .get((req, res) => readCtrl.getOrders(res));


module.exports = routes;