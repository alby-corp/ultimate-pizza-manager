var express = require('express');
var fs = require('fs');
var path = require('path');
const fileName = "pizzeList.txt";

var app = express();

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/insert', function (req, res) {
    addOrder(req.query.user, req.query.pizza)
    res.send('Ordine registrato :)');
    //TODO add promise
});

app.get('/getList', function (req, res) {
    res.sendFile(path.join(__dirname, './', 'pizzeList.txt'));
});

function addOrder(user, pizza) {
    var order = createRow(user, pizza);
    fs.appendFile(fileName, order, "utf8", function (err) {
        if (err) {
            console.log(err);
        }
    });
}

function createRow(user, pizza) {
    return getColumnFromString("______") + getColumnFromString(user) + getColumnFromString(pizza) + '\r\n';
}

function getColumnFromString(s) {
    const column = "                    ";
    return s + column.substring(1, column.length - s.length)
}

app.listen(22222, function () {
    //se il file non esiste lo crea
    fs.exists(fileName, function (exists) {
        if (!exists) { 
            fs.appendFile(fileName, createRow("NOME", "PIZZA"), "utf8", function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
    console.log('Example app listening on port 3000!');
});