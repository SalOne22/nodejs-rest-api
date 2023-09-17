const { contactsModel } = require('../../models');

async function getAll(req, res) {
  const { page = 1, limit = 10, favorite = null } = req.query;
  const skip = (page - 1) * limit;

  const query = { owner: req.user.id };

  if (favorite !== null) query.favorite = favorite;

  const result = await contactsModel.find(query).skip(skip).limit(limit);

  res.json(result);
}

module.exports = getAll;
