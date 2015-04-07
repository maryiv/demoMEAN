var mongoose = require('libs/mongoose');
var async = require('async');
var Photo = require('models/photo').Photo;

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function createPhotos(callback) {
    var users = [
        {name: 'demo-1.jpg', main: true, show: true},
        {name: 'demo-2.png', main: false, show: true},
        {name: 'demo-3.jpg', main: false, show: true}
    ];
    async.each(users, function(userData, callback) {
        var photo = new Photo(userData);
        photo.save(callback);
    }, callback);
}

function close() {
    mongoose.disconnect();
}

async.series([
    open,
    dropDatabase,
    createPhotos,
    close
], function(err) {
    console.log(arguments);
});