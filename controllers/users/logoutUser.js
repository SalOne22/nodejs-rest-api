const { usersModel } = require('../../models');
const { HttpError } = require('../../utils');

async function logout(req, res) {
  const user = await usersModel.findByIdAndUpdate(
    req.user.id,
    { token: null },
    { new: true },
  );

  if (!user) throw new HttpError(401);

  res.status(204).send();
}

module.exports = logout;
