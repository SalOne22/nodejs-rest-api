const { usersModel } = require('../../models');
const { HttpError } = require('../../utils');

async function updateSubscription(req, res) {
  const user = await usersModel.findByIdAndUpdate(
    req.user.id,
    {
      subscription: req.body.subscription,
    },
    { new: true },
  );

  if (!user) throw new HttpError(401);

  res.json({
    email: user.email,
    subscription: user.subscription,
  });
}

module.exports = updateSubscription;
