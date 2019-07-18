const Joi = require("joi");
const mongoose = require("mongoose");

module.exports.validate = function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(5)
      .required(),
    phone: Joi.string()
      .min(7)
      .required(),
    isGold: Joi.boolean().default(false)
  };
  return Joi.validate(genre, schema);
};

module.exports.schema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 255, minlength: 5 },
  phone: { type: String, required: true },
  isGold: { type: Boolean, default: false }
});
