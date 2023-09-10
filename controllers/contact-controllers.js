const contact = require('../models/contacts');

const { newContactSchema } = require('../schemas/contact-schema');

const { controllerWrapper } = require('../decorators');
const { HttpError } = require('../utils');

async function getAll(req, res) {
  const result = await contact.find({});

  res.json(result);
}

async function getById(req, res) {
  const { id } = req.params;

  const result = await contact.findById(id);
  if (result === null) throw new HttpError(404);

  res.json(result);
}

async function add(req, res) {
  await newContactSchema.validateAsync(req.body);

  const result = await contact.create(req.body);

  res.status(201).json(result);
}

async function remove(req, res) {
  const { id } = req.params;

  const result = await contact.findByIdAndDelete(id);
  if (result === null) throw new HttpError(404);

  res.json({ message: 'contact deleted' });
}

async function update(req, res) {
  const { id } = req.params;

  await newContactSchema.validateAsync(req.body);

  const result = await contact.findByIdAndUpdate(id, req.body);
  if (result === null) throw new HttpError(404);

  res.json(result);
}

module.exports = {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  add: controllerWrapper(add),
  remove: controllerWrapper(remove),
  update: controllerWrapper(update),
};
