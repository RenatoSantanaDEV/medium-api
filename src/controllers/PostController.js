class PostController {
    async store(req,res) {
        req.json('Index');
    }
}

module.exports = new PostController();