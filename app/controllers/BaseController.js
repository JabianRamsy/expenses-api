export class BaseController {

	constructor(app){
    this.app = app;
	}

init(){
  this.app.get(this.baseRoute, this.index.bind(this));
  this.app.post(this.baseRoute, this.store.bind(this));
  this.app.delete(this.baseRoute + '/:id', this.destroy.bind(this)); // /:id is a parameter in the path
  this.app.put(this.baseRoute + '/:id', this.update.bind(this)); // /:id is a parameter in the path
}

	handleError(req, res, err){
		console.log('Error',err);
		res.status(500).json({error:err});
	}

  index(req, res){
		this.model.query()
		.then(result => {
      var response = {};
      response[this.responseKey] = result;
			res.json(response);
		})
		.catch(e => {this.handleError(req, res, e);
		});
	}

  saveModel(req, res, obj){
    console.log('OBJECT++++++++++++'+obj);
    obj.save(err => {
			if(err){
				return this.handleError(req,res,err);
			}
			res.json(obj);
		});
  }



  restoreModel(req, res, model){
    console.log('RESTORE++++',model);
    model.deletedAt = null;
    return this.saveModel(model);
  }

	store(req,res){
    var newModel = new this.model(req.body);
  		if(!newModel){
  			return res.status(400).json({error:'Wrong request'});
  		}
      this.saveModel(req, res, newModel);
	}

  destroy(req, res){
    let model = this.model.findById(req.params.id, (err, model) => {
      if(err || !model){
        return this.handleError(req, res, err);
      }
      model.deletedAt = new Date();
      this.saveModel(req,res,model);
    });
  }

	update(req,res){
		var model = this.model.findById(req.params.id,(err, model) => {
			if(err || !model){
        return this.handleError(req, res, err);
      }

			for(let k in req.body){
				model[k] = req.body[k];
			}
			model.updatedAt = new Date();
			this.saveModel(req,res,model);

		});
	}
}
