const { contactsModel } = require('../../models');
const { newContactSchema } = require('../../schemas/contact');

async function add(req, res) {
  await newContactSchema.validateAsync(req.body);

  const result = await contactsModel.create(req.body);

  res.status(201).json(result);
}

module.exports = add;
