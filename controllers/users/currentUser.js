const { usersModel } = require('../../models');
const { HttpError } = require('../../utils');

async function current(req, res) {
  const user = await usersModel.findById(req.user.id);

  if (!user) throw new HttpError(401);

  res.json({
    email: user.email,
    subscription: user.subscription,
  });
}

module.exports = current;
