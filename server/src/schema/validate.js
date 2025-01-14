class SchemaValidator {
  validate(schema) {
    return async (req, res, next) => {
      try {
        if (req.file && schema.file) {
          req.data = await schema.file.validate(req.file);

        } else if (req.body && schema.body) {
          req.data = await schema.body.validate(req.body);
        }

        if (req.params && schema.params) {
          req.filter = await schema.params.validate(req.params);
        }

        if (req.query && schema.query) {
          req.filter = {
            ...(req.filter || {}),
            ...(await schema.query.validate(req.query)),
          };
        }

        return next();
      } catch (err) {
        return res.status(400).json({
          error: err.errors ? err.errors.join(', ') : err.message,
        });
      }
    };
  }
}

module.exports = SchemaValidator;
