const { usersModel } = require('../../models');
const { HttpError } = require('../../utils');

async function verifyEmail(req, res) {
  const { verificationToken } = req.params;

  const user = await usersModel.findOne({ verificationToken });

  if (!user) throw new HttpError(404, 'User not found');

  await user.updateOne(
    { verificationToken: null, verify: true },
    { runValidators: false },
  );

  res.json({ message: 'Verification successful' });
}

module.exports = verifyEmail;
