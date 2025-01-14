const { Router } = require('express');

const ThumbnailController = require('../controllers/ThumbnailController.js');
const multerVerify = require('../middlewares/multerVerify.js');

const thumbnailSchema = require('../schema/thumbnailSchema.js');
const SchemaValidator = require('../schema/validate.js');

const router = new Router();
const schemaValidator = new SchemaValidator();

router.post('/:id',schemaValidator.validate(thumbnailSchema.storeThumbnail), multerVerify.create, ThumbnailController.storeThumbnail);

module.exports = router;
