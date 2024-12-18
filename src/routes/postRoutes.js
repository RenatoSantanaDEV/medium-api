const { Router } = require('express');

const postController = require('../controllers/PostController.js');
const validToken = require('../middlewares/loginRequired.js');

const router = new Router();

router.post('/', validToken, postController.storePost);
router.put('/:id', validToken, postController.updatePost);
router.delete('/:id', validToken, postController.deletePost)
router.get('/', validToken, postController.indexPost);
router.post('/:id/like', validToken, postController.storeLike);

module.exports = router;