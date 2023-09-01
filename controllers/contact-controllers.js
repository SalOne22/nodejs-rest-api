const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../models/contacts');

const { newContactSchema } = require('../schemas/contact-schema');

const { HttpError } = require('../utils');

async function getAll(req, res, next) {
  try {
    const result = await listContacts();

    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const { contactId } = req.params;

    const result = await getContactById(contactId);
    if (result === null) throw new HttpError(404);

    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function add(req, res, next) {
  try {
    await newContactSchema.validateAsync(req.body);

    const result = await addContact(req.body);

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const { contactId } = req.params;

    const result = await removeContact(contactId);
    if (result === null) throw new HttpError(404);

    res.json({ message: 'contact deleted' });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { contactId } = req.params;

    await newContactSchema.validateAsync(req.body);

    const result = await updateContact(contactId, req.body);
    if (result === null) throw new HttpError(404);

    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
