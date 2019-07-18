const Joi = require("joi");
const mongoose = require("mongoose");

module.exports.validate = function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(5)
      .required()
  };
  return Joi.validate(genre, schema);
};

module.exports.schema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 255, minlength: 5 }
});
