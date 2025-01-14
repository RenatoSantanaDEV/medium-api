const { Router } = require('express');

const UserController = require('../controllers/UserController.js');

const userSchema = require('../schema/userSchema.js');
const SchemaValidator = require('../schema/validate.js');
const validToken = require('../middlewares/loginRequired.js');

const router = new Router();
const schemaValidator = new SchemaValidator();


router.post('/', schemaValidator.validate(userSchema.storeUser), UserController.storeUser);
router.get('/:id', validToken, UserController.showUser);

module.exports = router;