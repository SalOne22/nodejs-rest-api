const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../models/contacts');

const { newContactSchema } = require('../schemas/contact-schema');

const { controllerWrapper } = require('../decorators');
const { HttpError } = require('../utils');

async function getAll(req, res) {
  const result = await listContacts();

  res.json(result);
}

async function getById(req, res) {
  const { contactId } = req.params;

  const result = await getContactById(contactId);
  if (result === null) throw new HttpError(404);

  res.json(result);
}

async function add(req, res) {
  await newContactSchema.validateAsync(req.body);

  const result = await addContact(req.body);

  res.status(201).json(result);
}

async function remove(req, res) {
  const { contactId } = req.params;

  const result = await removeContact(contactId);
  if (result === null) throw new HttpError(404);

  res.json({ message: 'contact deleted' });
}

async function update(req, res) {
  const { contactId } = req.params;

  await newContactSchema.validateAsync(req.body);

  const result = await updateContact(contactId, req.body);
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
