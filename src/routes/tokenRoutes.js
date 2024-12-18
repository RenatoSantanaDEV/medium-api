const { Router } = require('express');
const TokenController = require('../controllers/TokenController.js');

const router = new Router();

router.post('/', TokenController.storeToken);

module.exports = router;