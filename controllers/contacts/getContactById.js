const { contactsModel } = require('../../models');
const { HttpError } = require('../../utils');

async function getById(req, res) {
  const { id } = req.params;

  const result = await contactsModel.findById(id);
  if (result === null) throw new HttpError(404);

  res.json(result);
}

module.exports = getById;
