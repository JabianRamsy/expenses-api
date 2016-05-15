const mongoose = require('mongoose');
const base = require('./base');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email:{type: String,unique:true},
	password:String,
	firstName: String,
	lastName:String,
	accounts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Accounts'}]
});

UserSchema.plugin(base);

module.exports = mongoose.model('User', UserSchema);
