const {Contact} = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers")


const listContacts = async(req, res) => {
  const {_id: owner} = req.user;
  comsole.log(page = 1, limit = 10) = req.query;
  const result = await Contact.find({owner}, "-createAt -updateAt", {skip, limit}).populate("owner", "name email");
  const skip = (page - 1) * limit;
  res.json(result);
}

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const {_id} = req.user;
  const result = await Contact.findById({_id: contactId, owner: _id});
  if(!result){
    throw HttpError(404, "Not found");
  }
  res.json(result);  
}

const removeContact = async (req, res) => {
  const {contactId} = req.params;
  const { _id } = req.user;
  const result = await Contact.findByIdAndRemove({_id: contactId});
  console.log(result);
  if (!result){
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Delete success"
  })
}


const addContact = async (req, res) => {
  const {_id: owner} = req.user;
  const result = await Contact.create(...req.body, owner);
  res.status(201).json(result);
}


const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await Contact.findByIdAndUpdate({_id: contactId, owner: _id}, req.body);

  if(!result){
    throw HttpError(404, "Not found");
  }
  res.json(result)
  }


  const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const key = Object.keys(req.body);
    const { _id } = req.user;
    if (!key.length) {
      throw HttpError(400, "missing field favorite");
    }
    const result = await Contact.findByIdAndUpdate({_id: contactId, owner: _id}, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  };
  

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
}
