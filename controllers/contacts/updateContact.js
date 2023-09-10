const { contactsModel } = require('../../models');
const { newContactSchema } = require('../../schemas/contact');
const { HttpError } = require('../../utils');

async function update(req, res) {
  const { id } = req.params;

  await newContactSchema.validateAsync(req.body);

  const result = await contactsModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (result === null) throw new HttpError(404);

  res.json(result);
}

module.exports = update;
