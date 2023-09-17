const { contactsModel } = require('../../models');

async function getAll(req, res) {
  const result = await contactsModel.find({ owner: req.user.id });

  res.json(result);
}

module.exports = getAll;
