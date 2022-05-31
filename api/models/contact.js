const Joi = require('joi');
const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250,
  },
  last_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250,
  },
  phone_number: {
    type: String,
    required: false,
    minlength: 8,
    maxlength: 30,
  },

  address_lines: {
    type: [String],
    required: false,
  },

  created_by: {
    type: Schema.Types.ObjectId,
    required: true,
    minlength: 5,
    maxlength: 1024,
    ref: 'user',
  },
});

const Contact = model('contact', contactSchema);

/** VALIDATIONS */
const validateContactRegister = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  last_name: Joi.string().min(3).max(255).required(),
  phone_number: Joi.string().min(8).max(30).required(),
  address_lines: Joi.array()
    .min(1)
    .items(Joi.string().min(1).max(355))
    .required(),
});

module.exports = {
  Contact,
  validateContactRegister,
};
