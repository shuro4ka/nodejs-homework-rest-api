const {Schema, model} =require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../helpers");
const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema({
    
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
   password: {
    type: String,
    required: [true, 'password is required']
   },

   subscription: {
    type: String,
    enum: subscriptionList,
    default: "starter",
  },

    token: {
      type: String,
      default: "",
    },

    avatarURL: {
      type: String,
      required: true,
    }
  
}, {versionKey: false});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...subscriptionList),
});

const schemas = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
}

const User = model("user", userSchema);

module.exports = {
  User,
  schemas

}
