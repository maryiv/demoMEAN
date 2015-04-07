var express = require('express');
//var HttpError = require('error').HttpError;

var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'Demo application'
  });
});

var User = require('models/user').User;
router.get('/users', function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) return next(err);
        res.json(users);
    });
    //res.send('respond with a resource');
});
router.get('/user/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) return next(err);
        if (!user) {
            next(404);
        }
        res.json(user);
    });
});

module.exports = router;
