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

app.get('/getWeekOrders', (req, res) => {
    //const orders = await db.context.getOrders();
    /*
    const db = require('./db.json');
    const menu = require('./menu.json');

    const blank = {food: "", price: 0};

    let orders = db.orders.map(order => ({
        user: order.user,
        data: order.data,
        pizza: menu.pizzas.find(p => p.id == order.pizza) === undefined ? blank : menu.pizzas.find(p => p.id == order.pizza),
        food: menu.foods.find(p => p.id == order.food) === undefined ? blank : menu.foods.find(p => p.id == order.food),
        sandwiche: menu.sandwiches.find(p => p.id == order.sandwiche) === undefined ? blank : menu.sandwiches.find(p => p.id == order.sandwiche),
        dessert: menu.desserts.find(p => p.id == order.dessert) === undefined ? blank : menu.desserts.find(p => p.id == order.dessert),
        dough: menu.doughs.find(d => d.id == order.dough) === undefined ? blank : menu.doughs.find(d => d.id == order.dough),
        supplements: menu.supplements.filter(m => order.supplements.includes(m.id.toString())) === undefined ? blank : menu.supplements.filter(m => order.supplements.includes(m.id.toString()))
    }));
    */ 
    // orders.map(order => order.total = order.pizza.price + order.food.price + order.sandwiche.price + order.dessert.price + order.dessert.price + order.dough.price + order.supplements.reduce((acc, x) => acc + x.price, 0));

    // res.send(orders);
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