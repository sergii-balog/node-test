const mongoose = require("mongoose");
const modelRentals = require("../models/rental");
const Fawn = require("fawn");

const Rental = mongoose.model("Rental", modelRentals.schema);
Fawn.init(mongoose);

module.exports.getAllRentals = async function getAllRentals() {
  const rentals = await Rental.find().sort({ dateOut: -1 });
  return rentals;
};

module.exports.getRental = async function getRental(id) {
  const rental = await Rental.find({ _id: id });
  return rental[0];
};

// module.exports.updateMovie = async function updateMovie(
//   id,
//   newTitle,
//   newNumberInStock,
//   newDailyRentalRent,
//   newGenreId
// ) {
//   const result = await Rental.findByIdAndUpdate(
//     id,
//     {
//       $set: {
//         title: newTitle,
//         numberInStock: newNumberInStock,
//         dailyRentalRent: newDailyRentalRent,
//         genre: newGenreId
//       }
//     },
//     { new: true }
//   );
//   return result;
// };

module.exports.createRental = async function createRental(
  client,
  movie,
  dateOut,
  dateReturned,
  rentalFee
) {
  const rental = new Rental({
    client: client,
    movie: movie,
    dateOut: dateOut,
    dateReturned: dateReturned,
    rentalFee: rentalFee,
    movie
  });
  //return await rental.save();
  new Fawn.Task()
    .save("rentals", rental)
    .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
    .run();
  return rental;
};

module.exports.removeRental = async function removeRental(id) {
  return await Rental.findByIdAndRemove({ _id: id });
};
