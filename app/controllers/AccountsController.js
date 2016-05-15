const Account = require('../models/accounts');
const Movement = require('../models/movement');
import {BaseController} from './BaseController';

export class AccountsController extends BaseController{
	constructor(app){
		super(app);
		this.model = Account;
		this.baseRoute = '/v1/accounts';
		this.responseKey = 'accounts'

		this.app.get(this.baseRoute + '/:id/movements', this.getMovements.bind(this));
	}

	getMovements(req, res){
		Movement.query({
			account: req.param.id
		})
		.then(result => res.json(result))
		.catch(e => this.handleError(req, res,e));
	}
}
