var User = require('../models/user');
import {BaseController} from './BaseController';

export class UsersController extends BaseController{
	constructor(app){
		super(app);
		this.model = User;
		this.baseRoute = '/v1/users';
		this.responseKey = 'users'

	}

	store(req,res){
		this.model.findOne({
			email: req.body.email
		}, (err, model)=> {
			if(err){return this.handleError(req, res, err);}
			if(model){return this.restoreModel(req,res,model);}

			var newUser = new this.model(req.body);
			if(!newUser){
				return res.status(400).json({error:'Wrong request'});
			}
			console.log('NewUSer++++++' + newUser);
			this.saveModel(req, res, newUser);
		});
	}
}
