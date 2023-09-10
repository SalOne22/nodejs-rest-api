const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../utils');

const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new HttpError(400, `${id} is not a valid id`);
  }

  next();
};

module.exports = validateId;
