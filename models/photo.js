var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;
var schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    main: {
        type: Boolean,
        required: true
    },
    show: {
        type: Boolean,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});
schema.methods.getName = function() {
    console.log(this.get('name'));
}

exports.Photo = mongoose.model('Photo', schema);