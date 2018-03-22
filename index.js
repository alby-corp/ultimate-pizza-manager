const express = require('express');
const fs = require('fs');
const path = require('path');
const filename = "./db.json";
// const menu = require('./infrastructure/_menu.json');
const app = express();
const bodyParser = require('body-parser');
const validator = require('express-validator');
const context = require('./server/data-layer');

const model = require('./server/model');
const common = require('./wwwroot/js/common');

// Static files
app.use('/public', express.static('wwwroot'));
app.use(express.static('resources'));

app.use(bodyParser.urlencoded());

// app.use(validator());
// app.use(function (req, res, next) {
//     for (let item in req.body) {
//         req.sanitize(item).escape();
//     }
//     next();
// });

// Body parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// API
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/users', async (req, res) => {
    res.send((await context.getUsers()).rows);
});

app.get('/foods', async (req, res) => {

    const foods = (await context.getFoods()).rows.map(row => row.json);
    res.send(foods);
});

app.get('/supplements', async (req, res) => {
    const supplements = await context.getSupplements();
    res.send(supplements.rows);
});

app.get('/getWeekOrders', async (req, res) => {
    const orders = await context.getOrders();
    res.send(orders.rows.map(row => row.json_build_object));
});

app.post('/insert', async (req, res) => {

    const data = req.body;

    const order = new model.Order(+data.user.id,  data.foods.map(f => {
        const food = new common.Food(+f.id);
        food.supplements = (f.supplements || []).map(s => new common.Ingredient(+s.id));
        food.removals = (f.removals || []).map(s => new common.Ingredient(+s.id));

        return food;
    }));

    await order.Save();

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