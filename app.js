var express = require('express');
var path = require('path');
var config = require('config');
var favicon = require('serve-favicon');
var log = require('libs/log')(module);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.listen(config.get('port'), function() {
    log.info('Welcome to Demo application on the PORT '+config.get('port'));
});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', users);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;