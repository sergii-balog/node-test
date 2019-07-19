const Joi = require("joi");
const mongoose = require("mongoose");

module.exports.validate = function validateAuth(request) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(50)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(request, schema);
};

// module.exports.schema = new mongoose.Schema({
//   name: { type: String, required: true, maxlength: 255, minlength: 5 },
//   email: {
//     type: String,
//     required: true,
//     maxlength: 255,
//     minlength: 5,
//     unique: true
//   },
//   password: { type: String, required: true, maxlength: 1024, minlength: 5 }
// });
