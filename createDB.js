var mongoose = require('libs/mongoose');
var async = require('async');

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function reqiereModels(callback) {
    require('models/user');
    require('models/photo');
    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUsers(callback) {
    var users = [
        {name: 'admin', password: 'secret'},
        {name: 'user', password: 'test'}
    ];
    async.each(users, function(userData, callback) {
        var user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);
}

function createPhotos(callback) {
    var photos = [
        {name: 'demo-1.jpg', main: true, show: true},
        {name: 'demo-2.png', main: false, show: true},
        {name: 'demo-3.jpg', main: false, show: true}
    ];
    async.each(photos, function(photoData, callback) {
        var photo = new mongoose.models.Photo(photoData);
        photo.save(callback);
    }, callback);
}

async.series([
    open,
    dropDatabase,
    reqiereModels,
    createUsers,
    createPhotos
], function(err) {
    console.log(arguments);
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
});