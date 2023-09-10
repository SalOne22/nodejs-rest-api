const { contactsModel } = require('../../models');

async function getAll(req, res) {
  const result = await contactsModel.find({});

  res.json(result);
}

module.exports = getAll;
