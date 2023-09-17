const Joi = require('joi');

const userSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .allow('starter', 'pro', 'business')
    .only()
    .required(),
});

module.exports = userSubscriptionSchema;
