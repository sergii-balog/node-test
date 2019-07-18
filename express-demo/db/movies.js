const mongoose = require("mongoose");
const modelMovie = require("../models/movie");

const Movie = mongoose.model("Movie", modelMovie.schema);

module.exports.getAllMovies = async function getAllMovies() {
  const movies = await Movie.find();
  return movies;
};

module.exports.getMovie = async function getMovie(id) {
  const movie = await Movie.find({ _id: id });
  return movie[0];
};

module.exports.updateMovie = async function updateMovie(
  id,
  newTitle,
  newNumberInStock,
  newDailyRentalRent,
  newGenreId
) {
  const result = await Movie.findByIdAndUpdate(
    id,
    {
      $set: {
        title: newTitle,
        numberInStock: newNumberInStock,
        dailyRentalRent: newDailyRentalRent,
        genre: newGenreId
      }
    },
    { new: true }
  );
  return result;
};

module.exports.createMovie = async function createMovie(
  title,
  numberInStock,
  dailyRentalRent,
  genre
) {
  const movie = new Movie({
    title: title,
    numberInStock: numberInStock,
    dailyRentalRent: dailyRentalRent,
    genre: genre
  });
  return await movie.save();
};

module.exports.removeMovie = async function removeMovie(id) {
  return await Movie.findByIdAndRemove({ _id: id });
};
