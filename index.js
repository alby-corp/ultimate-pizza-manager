const express = require('express');
const fs = require('fs');
const path = require('path');
const filename = "./db.json";
// const menu = require('./infrastructure/_menu.json');
const app = express();
const bodyParser = require('body-parser');

const context = require('./server/data-layer');

const dao = require('./server/dao');
const common = require('./wwwroot/js/common');

// Static files
app.use('/public', express.static('wwwroot'));
app.use(express.static('resources'));

// Body parser
app.use(bodyParser.urlencoded());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// API
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/users', async (req, res) => {

    const users = await context.getUsers();
    res.send(users);
});

app.get('/foods', async (req, res) => {

    const foods = await context.getFoods();
    res.send(foods);
});

app.get('/supplements', async (req, res) => {

    const supplements = await context.getSupplements();
    res.send(supplements);
});

app.get('/orders', async (req, res) => {

    const orders = await context.getOrders();
    res.send(orders);
});

app.get('/administrators', async (req, res) => {

    const getAdministrators = await context.getAdministrators();
    res.send(getAdministrators);
});

app.post('/insert', async (req, res) => {

    const data = req.body;

    const user = new common.User(+data.user.id);
    const foods = data.foods.map(f => new common.OrderedFood(new common.Food(+f.id), f.supplements, f.removals));

    const order = new dao.OrderDAO(user, foods);

    try {
        order.validate();
    } catch (error) {
        res.send('Ordine non valido si prega di riprovare. Magari utilizzando il client messo a disposizione e non postman o simili!');
    }

    await order.save();

    res.status(200);
    res.send('Ordine Registrato');
});

// Server config
app.listen(process.env.PORT || 8080, () => {
    //se il file non esiste lo crea
    fs.exists(filename, function (exists) {
        if (!exists) {
            fs.appendFile(filename, '{"orders": []}', "utf8", function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
    console.log('Example app listening on port: ' + (process.env.PORT || 8080));
});