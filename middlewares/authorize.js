const jwt = require('jsonwebtoken');

const { HttpError } = require('../utils');
const { usersModel } = require('../models');
const { controllerWrapper } = require('../decorators');

const { SECRET } = process.env;

const authorize = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) throw new HttpError(401);

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) throw new HttpError(401);

  const { id } = jwt.verify(token, SECRET);
  const user = await usersModel.findById(id);

  if (user?.token !== token) throw new HttpError(401);

  req.user = user;

  next();
};

module.exports = controllerWrapper(authorize);
