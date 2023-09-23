const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const { usersModel } = require('../../models');
const { registrationSchema } = require('../../schemas/user');
const { HttpError } = require('../../utils');

async function register(req, res) {
  await registrationSchema.validateAsync(req.body);

  const { email, password } = req.body;

  if (await usersModel.findOne({ email })) {
    throw new HttpError(409, 'Email in use');
  }

  const result = await usersModel.create({
    email,
    password: await bcrypt.hash(password, 10),
    avatarURL: gravatar.url(email, { protocol: 'http' }),
  });

  res.status(201).json({
    user: {
      email,
      subscription: result.subscription,
    },
  });
}

module.exports = register;
