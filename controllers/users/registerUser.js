const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const { usersModel } = require('../../models');
const { registrationSchema } = require('../../schemas/user');
const { HttpError, sendEmail } = require('../../utils');

const { BASE_URL } = process.env;

async function register(req, res) {
  await registrationSchema.validateAsync(req.body);

  const { email, password } = req.body;

  if (await usersModel.findOne({ email })) {
    throw new HttpError(409, 'Email in use');
  }

  const verificationToken = nanoid();

  const result = await usersModel.create({
    email,
    verificationToken,
    password: await bcrypt.hash(password, 10),
    avatarURL: gravatar.url(email, { protocol: 'http' }),
  });

  const verificationMail = {
    to: email,
    subject: 'Email verification',
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verificationMail);

  res.status(201).json({
    user: {
      email,
      subscription: result.subscription,
    },
  });
}

module.exports = register;
