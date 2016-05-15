var mongoose = require('mongoose');

module.exports = function baseModel(schema, option){
	schema.add({createdAt: {type: Date,default:Date.now}});
	schema.add({updatedAt: {type: Date,default:Date.now}});
	schema.add({deletedAt: {type: Date,default:null}});

	schema.statics.ignoreDeleted = function ignoreDeleted(){
		return this.find({
			'$or': [
				{deletedAt: {'$exists': false} },
				{deletedAt: null}
			]
		});
		//.where('deletedAt').exists(false);
	};

	schema.statics.query = function execQuery(){
		return this.ignoreDeleted();
	};
}
