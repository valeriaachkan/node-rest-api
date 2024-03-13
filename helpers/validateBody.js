const HttpError = require('./HttpError');

const validateBody = (schema) => {
  const func = (req, _, next) => {
    if (!Object.entries(req.body).length) {
      next(HttpError(400, 'Body must have at least one field'));
    }
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
