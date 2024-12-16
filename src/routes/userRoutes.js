const { Router } = require('express');

const userController = require('../controllers/UserController.js');
const validToken = require('../middlewares/loginRequired.js');

const router = new Router();

router.post('/', userController.store);
router.get('/', validToken, userController.index);
router.get('/:id', validToken, userController.show);
router.put('/:id', validToken, userController.update);
router.delete('/:id', validToken, userController.delete);

module.exports = router;
