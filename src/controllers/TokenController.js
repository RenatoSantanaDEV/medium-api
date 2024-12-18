const tokenService = require('../services/tokenService.js');
const BaseController = require('./BaseController.js');

class TokenService extends BaseController {
    constructor(){
        super();
        this.storeToken = this.storeToken.bind(this);
    }
    async storeToken(req, res) {
      try {
        const newToken = await tokenService.storeToken(req.body);
        this.handleResponse(res, newToken);
    } catch (e) {
        this.handleError(res, 'ERROR')

        }
    }
}

module.exports = new TokenService();