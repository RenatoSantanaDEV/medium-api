const { Router } = require('express');

const userController = require('../controllers/UserController.js');
const loginRequired = require('../middlewares/loginRequired.js');

const router = new Router();

router.post('/', userController.store);
router.get('/', userController.index);
router.get('/:id', loginRequired, userController.show);
router.put('/:id', loginRequired, userController.update);
router.delete('/:id', loginRequired, userController.delete);

module.exports = router;
