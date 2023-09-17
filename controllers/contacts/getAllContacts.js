const { contactsModel } = require('../../models');

async function getAll(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const result = await contactsModel
    .find({ owner: req.user.id })
    .skip(skip)
    .limit(limit);

  res.json(result);
}

module.exports = getAll;
