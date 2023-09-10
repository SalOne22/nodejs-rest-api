const Joi = require('joi');

const newContactSchema = Joi.object({
  name: Joi.string()
    .pattern(/^\w+(?:\s+\w+)*$/)
    .required()
    .messages({
      'string.pattern.base':
        '"name" must only contain alpha-numeric characters',
    }),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im)
    .required()
    .messages({
      'string.pattern.base': '"phone" must be a valid phone number',
    }),
});

module.exports = newContactSchema;
