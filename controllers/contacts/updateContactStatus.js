const { contactsModel } = require('../../models');
const { favoriteContactSchema } = require('../../schemas/contact');
const { HttpError } = require('../../utils');

async function updateStatus(req, res) {
  const { id } = req.params;

  await favoriteContactSchema.validateAsync(req.body);

  const result = await contactsModel.findOneAndUpdate(
    { _id: id, owner: req.user.id },
    req.body,
    {
      new: true,
    },
  );

  if (result === null) throw new HttpError(404);

  res.json(result);
}

module.exports = updateStatus;
