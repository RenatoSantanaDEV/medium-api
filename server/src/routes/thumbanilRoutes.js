const { Router } = require('express');

const thumbnailSchema = require('../schema/thumbnailSchema.js');
const SchemaValidator = require('../schema/validate.js');
const thumbanilController = require('../controllers/ThumbnailController.js');
const router = new Router();
const schemaValidator = new SchemaValidator();

router.post('/:post_id', schemaValidator.validate(thumbnailSchema.storeThumbnail), thumbanilController.storeThumbnail);

module.exports = router;
