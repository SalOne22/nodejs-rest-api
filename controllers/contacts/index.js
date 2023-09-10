const { controllerWrapper } = require('../../decorators');

const getAll = require('./getAllContacts');
const getById = require('./getContactById');
const add = require('./addContact');
const remove = require('./removeContact');
const update = require('./updateContact');
const updateStatus = require('./updateContactStatus');

module.exports = {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  add: controllerWrapper(add),
  remove: controllerWrapper(remove),
  update: controllerWrapper(update),
  updateStatus: controllerWrapper(updateStatus),
};
