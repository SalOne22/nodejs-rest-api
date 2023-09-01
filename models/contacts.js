const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.resolve('models/contacts.json');

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const contactToDeleteIndex = contacts.findIndex(
    (contact) => contact.id === contactId,
  );

  if (contactToDeleteIndex === -1) return null;

  const [deletedContact] = contacts.splice(contactToDeleteIndex, 1);

  await updateContacts(contacts);

  return deletedContact;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await updateContacts(contacts);

  return newContact;
}

async function updateContact(contactId, { name, email, phone }) {
  const contacts = await listContacts();

  const contactToUpdateIndex = contacts.findIndex(
    (contact) => contact.id === contactId,
  );

  if (contactToUpdateIndex === -1) return null;

  contacts[contactToUpdateIndex] = { id: contactId, name, email, phone };

  await updateContacts(contacts);

  return contacts[contactToUpdateIndex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
