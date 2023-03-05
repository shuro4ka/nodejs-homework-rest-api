const fs = require('fs/promises')
const path = require("path");
const{nanoid} = require("nanoid");
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
}

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id ===id);
  return result || null;
}

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item=>item.id === id);
  if(index === -1) {
    return null;
  }
  const removedContact = contacts.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
}

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  }
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item=>item.id === id);
  if(index === -1){
    return null;
  }
  contacts[index] = {id, ...body};
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
