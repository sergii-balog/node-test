const Joi = require("joi");
const mongoose = require("mongoose");
const modelClient = require("../models/client");

module.exports.schema = new mongoose.Schema({
  client: { type: modelClient.schema, required: true },
  movie: {
    type: new mongoose.Schema({
      title: { type: String, required: true, maxlength: 255, minlength: 5 },
      dailyRentalRent: { type: Number, default: 0 }
    }),
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0
  }
});

module.exports.validate = function validateMovie(rental) {
  const schema = {
    clientId: Joi.string().required(),
    movieId: Joi.string().required()
  };
  return Joi.validate(rental, schema);
};
