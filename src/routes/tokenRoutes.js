const { Router } = require('express');

const TokenController = require('../controllers/TokenController.js');
const tokenSchema = require('../schema/tokenSchema.js');
const SchemaValidator = require('../schema/validate');

const router = new Router();
const schemaValidator = new SchemaValidator();

router.post('/', schemaValidator.validate(tokenSchema.storeToken), TokenController.storeToken);

module.exports = router;