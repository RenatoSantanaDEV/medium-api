const { Router } = require('express');

const postSchema = require('../schema/postSchema.js');
const postController = require('../controllers/PostController.js');
const validToken = require('../middlewares/loginRequired.js');
const SchemaValidator = require('../schema/validate');
const LikeController = require('../controllers/LikeController.js');

const router = new Router();
const schemaValidator = new SchemaValidator();

router.post(
    '/',
    schemaValidator.validate(postSchema.storePost),
    validToken,
    postController.storePost
);
router.put(
    '/:id',
    schemaValidator.validate(postSchema.updatePost),
    validToken,
    postController.updatePost
);
router.get(
    '/',
    schemaValidator.validate(postSchema.indexPost),
    validToken,
    postController.indexPost
);
router.delete('/:id', validToken, postController.deletePost);
router.post('/:id/like', validToken, LikeController.like);
router.post('/:id/dislike', validToken, LikeController.dislike)

module.exports = router;
