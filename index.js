const express = require('express');
const fs = require('fs');
const path = require('path');
const filename = "./db.json";
const menu = require('./menu.json');
const app = express();
const bodyParser = require('body-parser');


// Static files
app.use('/public', express.static('wwwroot'));
app.use(express.static('resources'));

// Body parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// API
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/insert', (req, res) => {
    addOrder(req.body);

    res.send('Ordine registrato :)');

    //TODO add promise
});

app.get('/menu', (req, res) => {
    res.send(JSON.stringify(menu));
});

app.get('/getWeekOrders', (req, res) => {
    res.send(JSON.stringify(require('./db.json')));
});

// Helpers
addOrder = (body) => {
    body.data = new Date().toJSON();

    const db = require('./db.json');

    const deathLine = (d => new Date(d.setDate(d.getDate() - 14)))(new Date).toJSON();

    db.orders = db.orders.filter(o => o.data > deathLine);

    db.orders.push(body);

    fs.writeFile(filename, JSON.stringify(db));
};


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