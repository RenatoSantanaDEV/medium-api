const { Router } = require('express');

const UserController = require('../controllers/UserController.js');

const router = new Router();

router.post('/', UserController.storeUser);

module.exports = router;
