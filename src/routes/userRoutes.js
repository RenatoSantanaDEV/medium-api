const { Router } = require('express');
const UserController = require('../controllers/UserController.js');
const userSchema = require('../schema/userSchema.js');
const SchemaValidator = require('../schema/validate');

const router = new Router();
const schemaValidator = new SchemaValidator();


router.post('/', schemaValidator.validate(userSchema.storeUser),UserController.storeUser);

module.exports = router;