const Joi = require("joi");
const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");

module.exports.validate = function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
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
  return Joi.validate(user, schema);
};

module.exports.schema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 255, minlength: 5 },
  email: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 5,
    unique: true
  },
  password: { type: String, required: true, maxlength: 1024, minlength: 5 },
  isAdmin: { type: Boolean, default: false }
});

module.exports.generateAuthToken = function(user) {
  const issueDate = Date.now();
  return jwt.sign(
    {
      _id: user._id,
      isAdmin: user.isAdmin,
      issueDate: issueDate,
      name: user.name
    },
    config.get("jwtPrivateKey")
  );
};
