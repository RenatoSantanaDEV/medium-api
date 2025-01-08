const thumbanilService = require('../services/thumbanilService.js');
const BaseController = require('./BaseController.js');

class ThumbanilController extends BaseController {
    constructor() {
        super();
        this.storeThumbnail = this.storeThumbnail.bind(this);
    }

    async storeThumbnail(req, res) {
        try {
            const data = req.body
            const newThumbnail = await thumbanilService.storeThumbnail(data);
            this.handleResponse(res, newThumbnail);
        } catch (e) {
            this.handleError(res, 'ERROR');
        }
    }
}

module.exports = new ThumbanilController();
