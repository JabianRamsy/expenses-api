var mongoose = require('mongoose');
var base = require('./base');

var MovementsSchema = mongoose.Schema({
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' , required: true},
  amount: String,
  category: String
});

MovementsSchema.plugin(base);
MovementsSchema.statics.query = function execQuery(options = {}){
  let query = this.ignoreDeleted();
  if(options.hasOwnProperty('account')){
    query.where('account',options.account);
  }
  return query.exec();
}
module.exports = mongoose.model('Movements', MovementsSchema);
