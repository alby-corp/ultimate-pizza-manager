const createError = require('http-errors');
const path = require('path');
const fs = require('fs');
const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/app', express.static(path.join(__dirname, '../app')));
app.use('/api', routes);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

app.use(function (req, res, next) {
    if (req.uri === '/'){
        res.sendFile(path.join(__dirname, '../index.html'));
    }

    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.end();
});

module.exports = app;