const { usersModel } = require('../../models');
const { userEmailSchema } = require('../../schemas/user');
const { HttpError, sendEmail } = require('../../utils');

const { BASE_URL } = process.env;

async function resendVerification(req, res) {
  await userEmailSchema.validateAsync(req.body);

  const { email } = req.body;

  const user = await usersModel.findOne({ email });

  if (!user) throw new HttpError(404, 'User not found');

  if (user.verify)
    throw new HttpError(400, 'Verification has already been passed');

  const verificationMail = {
    to: email,
    subject: 'Email verification',
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verificationMail);

  res.json({ message: 'Verification email sent' });
}

module.exports = resendVerification;
