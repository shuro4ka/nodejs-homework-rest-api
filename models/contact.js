const {Schema, model} =require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../helpers");

const contactSchema = new Schema(
    {
        name: {
          type: String,
          required: [true, 'Set name for contact'],
        },
        email: {
          type: String,
        },
        phone: {
          type: String,
        },
        favorite: {
          type: Boolean,
          default: false,
        },
        owner: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        }
      }, {versionKey: false});

const updateSchema = Joi.object({
  favorite: Joi.boolean(),
});



contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean().default(false),
});


const schemas = {
  addSchema,
  updateSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};