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
            const { user_id} = req.body;

            const like = await likeService.like(id, user_id);
            this.handleResponse(res, like);
        } catch (e) {
            this.handleError(res, 'ERROR');
        }
    }

    async dislike(req, res) {
        try {
            const { id } = req.params;
            const { user_id } = req.body;

            const dislike = await likeService.dislike(id, user_id);
            this.handleResponse(res, dislike);
        } catch (e) {
            this.handleError(res, 'ERROR');
        }
    }
}

module.exports = new LikeController();
