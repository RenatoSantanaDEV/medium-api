const userService = require('../services/userService.js');
const BaseController = require('./BaseController.js');

class UserController extends BaseController {
    constructor(){
        super();
        this.storeUser = this.storeUser.bind(this);
        this.showUser = this.showUser.bind(this);
    }

    async storeUser(req, res) {
      try {
        const newUser = await userService.storeUser(req.body);
        this.handleResponse(res, newUser);
        } catch (e) {
            this.handleError(res, 'ERROR');
        }
    }

    async showUser(req, res) {
      try {
        const { id } = req.params;
        const showUser = await userService.showUser(id);

        this.handleResponse(res, showUser);
        } catch (e) {
            this.handleError(res, 'ERROR');
        }
    }
}

module.exports = new UserController();