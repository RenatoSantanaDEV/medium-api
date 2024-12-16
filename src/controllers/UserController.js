const userService = require('../services/userService.js');
const BaseController = require('./BaseController.js');

class UserController extends BaseController {
    constructor(){
        super();
        this.index = this.index.bind(this);
        this.show = this.show.bind(this);
        this.store = this.store.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
    }

    async index(req, res) {
      try {
          const users = await userService.index(req.filter); 
          this.handwleResponse(res, users);
      } catch (e) {
          this.handleError(res, 'ERROR');
      }
    }

    async show(req, res) {
        try {
          const user = await userService.show(req.actualUser);
          this.handleResponse(res, user)
        } catch (e) {
          this.handleError(res, 'ERROR')
    
        }
      }

    async store(req, res) {
      try {
        const newUser = await userService.store(req.body);
        this.handleResponse(res, newUser);
    } catch (e) {
        this.handleError(res, 'ERROR')

        }
    }

    async delete(req, res) {
        try {
          const user = await userService.deleteUser(req.actualUser, req.filter);
          this.handleResponse(res, user)
        } catch (e) {
          this.handleError(res, 'ERROR')
    
        }
      }
      
      async update(req, res) {
        try {
          const updatedUser = await userService.update(req.actualUser, req.data);
          this.handleResponse(res, updatedUser)
        } catch (e) {
          this.handleError(res, 'ERROR')
    
        }
      }
}

module.exports = new UserController();
