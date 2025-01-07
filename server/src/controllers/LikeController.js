const likeService = require('../services/likeService.js');
const BaseController = require('./BaseController.js');

class LikeController extends BaseController {
    constructor() {
        super();
        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);
    }

    async like(req, res) {
        try {
            const { id } = req.params;
            const { email } = req.body;

            const like = await likeService.like(id, email);
            this.handleResponse(res, like);
        } catch (e) {
            this.handleError(res, 'ERROR');
        }
    }

    async dislike(req, res) {
        try {
            const { id } = req.params;
            const { email } = req.body;

            const dislike = await likeService.dislike(id, email);
            this.handleResponse(res, dislike);
        } catch (e) {
            this.handleError(res, 'ERROR');
        }
    }
}

module.exports = new LikeController();
