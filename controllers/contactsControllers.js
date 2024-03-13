const contactsService = require('../services/contactsServices');
const HttpError = require('../helpers/HttpError');
const cntrlWrapper = require('../helpers/cntrlWrapper');

// @ GET /api/contacts
const getAllContacts = async (req, res) => {
  const result = await contactsService.allContacts();
  res.json(result);
};

// @ GET /api/contacts/:id
const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

// @ POST /api/contacts
const createContact = async (req, res) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

// @ PUT /api/contacts/:id
const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

// @ DELETE /api/contacts/:id
const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = {
  getAllContacts: cntrlWrapper(getAllContacts),
  getOneContact: cntrlWrapper(getOneContact),
  deleteContact: cntrlWrapper(deleteContact),
  createContact: cntrlWrapper(createContact),
  updateContact: cntrlWrapper(updateContact),
};
