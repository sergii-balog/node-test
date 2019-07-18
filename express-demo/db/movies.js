const mongoose = require("mongoose");

const schemaGenre = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 255, minlength: 5 }
});

const schemaMovie = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 255, minlength: 5 },
  numberInStock: { type: Number, default: 0 },
  dailyRentalRent: { type: Number, default: 0 },
  genre: { type: schemaGenre }
});

const Movie = mongoose.model("Movie", schemaMovie);

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
