const express = require("express");
const Joi = require("joi");
const router = express.Router();
const dbRentals = require("../db/rentals");
const dbMovies = require("../db/movies");
const dbClients = require("../db/clients");

const modelRental = require("../models/rental");

router.get("/", async (request, response) => {
  const result = await dbRentals.getAllRentals();
  response.send(JSON.stringify(result, null, " "));
});

router.get("/:id", async (request, response) => {
  const result = await dbRentals.getRental(request.params.id);
  if (!result)
    return response.status(404).send("The rental with such Id does not exist");
  response.send(JSON.stringify(result, null, " "));
});

router.post("/", async (request, response) => {
  const { error } = modelRental.validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  const client = await dbClients.getClient(request.body.clientId);
  if (!client)
    return response.status(404).send("The client with such Id does not exist");
  const movie = await dbMovies.getMovie(request.body.movieId);
  if (!movie)
    return response.status(404).send("The movie with such Id does not exist");
  if (movie.numberInStock === 0)
    return response.status(404).send("The movie is not available");

  const price = client.isGold
    ? movie.dailyRentalRent * 0.8
    : movie.dailyRentalRent;
  const result = await dbRentals.createRental(
    client,
    {
      _id: movie._id,
      title: movie.title,
      dailyRentalRent: movie.dailyRentalRent
    },
    Date.now(),
    null,
    price
  );
  movie.numberInStock--;
  movie.save();
  response.send(JSON.stringify(result, null, " "));
});

// router.put("/:id", async (request, response) => {
//   const { error } = modelMovie.validate(request.body);
//   if (error) return response.status(400).send(error.details[0].message);

//   const genre = await dbGenres.getGenre(request.body.genreId);
//   if (!genre)
//     return response.status(404).send("The genre with such Id does not exist");

//   const result = await dbMovies.updateMovie(
//     request.params.id,
//     request.body.title,
//     request.body.numberInStock,
//     request.body.dailyRentalRent,
//     {
//       _id: genre._id,
//       name: genre.name
//     }
//   );
//   if (!result)
//     return response.status(404).send("The movie with such Id does not exist");

//   response.send(JSON.stringify(result, null, " "));
// });

router.delete("/:id", async (request, response) => {
  const { error } = modelRental.validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  const result = await dbRentals.removeRental(request.params.id);
  if (!result)
    return response.status(404).send("The rental with such Id does not exist");

  response.send(JSON.stringify(result, null, " "));
});

module.exports = router;
