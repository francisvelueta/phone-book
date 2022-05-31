const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },

  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  role: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
});
/** STATICS */
userSchema.statics.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.statics.generateJWT = (payload, expiresIn = '14d') =>
  jwt.sign(payload, process.env.WEBTOKEN_SECRET, { expiresIn });

/** METHODS */
userSchema.methods.decryptPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);

/** VALIDATIONS */
const validateRegisterUser = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string().min(4).max(255).email().required(),
  password: Joi.string().min(8).max(255).required(),
});

const validateLogin = Joi.object({
  email: Joi.string().min(4).max(255).email().required(),
  password: Joi.string().min(4).max(255).required(),
});

const validateEmail = Joi.object({
  email: Joi.string().min(2).max(255).email().required(),
});

const validatePassword = Joi.object({
  password: Joi.string().min(4).max(50).required(),
});

module.exports = {
  User,
  validateRegisterUser,
  validateLogin,
  validateEmail,
  validatePassword,
};
