const createError = require('http-errors');
const path = require('path');
const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/views/index.html')));
app.use('/api', routes);
app.use('/public', express.static(__dirname + '/server/views', {'extensions': ['html']}));
app.use('/public', express.static('wwwroot'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.end();
});

module.exports = app;