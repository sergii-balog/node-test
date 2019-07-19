const Joi = require("joi");
const mongoose = require("mongoose");
const modelGenre = require("../models/genre");

module.exports.schema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 255, minlength: 5 },
  numberInStock: { type: Number, default: 0 },
  dailyRentalRent: { type: Number, default: 0 },
  genre: { type: modelGenre.schema }
});

module.exports.validate = function validateMovie(movie) {
  const schema = {
    title: Joi.string()
      .min(5)
      .required(),
    numberInStock: Joi.number().default(0),
    dailyRentalRent: Joi.number().default(0),
    genreId: Joi.objectId().required()
  };
  return Joi.validate(movie, schema);
};
