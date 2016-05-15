var mongoose = require('mongoose');
var base = require('./base');

var AccountsSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true},
  name: String,
  description: String
});

AccountsSchema.plugin(base);
AccountsSchema.statics.query = function execQuery(){
	let query = this.ignoreDeleted();
	query = query.populate('user');
	return query.exec();
};
module.exports = mongoose.model('Accounts', AccountsSchema);
