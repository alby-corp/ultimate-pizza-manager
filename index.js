const express = require('express');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');

const ultimatePizzaManagerContext = require('./server/ultimatePizzaManagerContext');
const helpers = require('./server/helpers');
const dao = require('./server/dao');
const common = require('./wwwroot/js/common');

// Body parser
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Static files
app.use('/public', express.static('wwwroot'));
app.use(express.static('resources'));

// API
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));

app.get('/foods', async (req, res) => {
    await helpers.makeResponse(res, new ultimatePizzaManagerContext.getFoods)
});

app.get('/users', async (req, res) => {
    await helpers.makeResponse(res, new  ultimatePizzaManagerContext.getUsers)
});

app.get('/supplements', async (req, res) => {
    await helpers.makeResponse(res, new ultimatePizzaManagerContext.getSupplements)
});

app.get('/orders', async (req, res) => {
    await helpers.makeResponse(res, new ultimatePizzaManagerContext.getOrders)
});

app.get('/administrators', async (req, res) => {
    await helpers.makeResponse(res, new ultimatePizzaManagerContext.getAdministrators)
});

app.post('/insert', async (req, res) => {

    const data = req.body;

    const user = new common.User(+data.user.id);
    const foods = data.foods.map(f => new common.OrderedFood(new common.Food(+f.id), f.supplements, f.removals));

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
        res.send(`Impossibile salvare l'ordine: ${error}`);
    }

    res.status(201);
    res.send('Ordine Registrato');
});

// Server config
app.listen(process.env.PORT || 8080, () => {
    console.log('Example app listening on port: ' + (process.env.PORT || 8080));
});