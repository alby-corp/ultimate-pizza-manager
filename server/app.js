const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();

app.use(express.urlencoded({extended: false}));


app.use('/app', express.static(path.join(__dirname, '../app')));

app.use(bodyParser.json());
app.use('/api', routes);

app.use((req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;