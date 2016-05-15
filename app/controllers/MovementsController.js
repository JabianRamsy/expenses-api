var Movement = require('../models/movement');
import {BaseController} from './BaseController';

export class MovementsController extends BaseController{
	constructor(app){
		super(app);
		this.model = Movement;
		this.baseRoute = '/v1/movements';
		this.responseKey = 'movements'

	}
}
