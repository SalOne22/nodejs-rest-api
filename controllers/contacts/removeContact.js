const { contactsModel } = require('../../models');
const { HttpError } = require('../../utils');

async function remove(req, res) {
  const { id } = req.params;

  const result = await contactsModel.findByIdAndDelete(id);
  if (result === null) throw new HttpError(404);

  res.json({ message: 'contact deleted' });
}

module.exports = remove;
