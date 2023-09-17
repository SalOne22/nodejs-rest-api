const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { usersModel } = require('../../models');
const { loginSchema } = require('../../schemas/user');
const { HttpError } = require('../../utils');

const { SECRET } = process.env;

async function login(req, res) {
  await loginSchema.validateAsync(req.body);

  const { email, password } = req.body;

  const user = await usersModel.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new HttpError(401, 'Email or password is wrong');
  }

  const token = jwt.sign({ id: user.id }, SECRET, {
    expiresIn: '7d',
  });

  await usersModel.findByIdAndUpdate(user.id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
}

module.exports = login;
