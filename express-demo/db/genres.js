const mongoose = require("mongoose");
const modelGenre = require("../models/genre");

const Genre = mongoose.model("Genre", modelGenre.schema);

module.exports.getAllGenres = async function getAllGenres() {
  const genres = await Genre.find();
  return genres;
};

module.exports.getGenre = async function getGenre(id) {
  const genre = await Genre.find({ _id: id });
  return genre[0];
};

module.exports.updateGenre = async function updateGenre(id, newName) {
  const result = await Genre.findByIdAndUpdate(
    id,
    {
      $set: {
        name: newName
      }
    },
    { new: true }
  );
  return result;
};

module.exports.createGenre = async function createGenre(name) {
  const genre = new Genre({
    name: name
  });
  return await genre.save();
};

module.exports.removeGenre = async function removeGenre(id) {
  return await Genre.findByIdAndRemove({ _id: id });
};
