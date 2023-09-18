const { usersModel } = require('../../models');
const { userSubscriptionSchema } = require('../../schemas/user');
const { HttpError } = require('../../utils');

async function updateSubscription(req, res) {
  await userSubscriptionSchema.validateAsync(req.body);

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
