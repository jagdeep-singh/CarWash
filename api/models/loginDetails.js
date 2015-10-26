var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var loginDetailsSchema = new Schema({
    id : Number,
    email: String,
    date: String,
    ipAddress: String
});

module.exports = mongoose.model('loginDetails', loginDetailsSchema, 'loginDetails');