const express = require("express");
const router = express.Router();
const dbMovies = require("../db/movies");
const dbGenres = require("../db/genres");
const modelMovie = require("../models/movie");
const authMiddleware = require("../middleware/auth");

router.get("/", async (request, response) => {
  const result = await dbMovies.getAllMovies();
  response.send(JSON.stringify(result, null, " "));
});

router.get("/:id", async (request, response) => {
  const result = await dbMovies.getMovie(request.params.id);
  if (!result)
    return response.status(404).send("The movie with such Id does not exist");
  response.send(JSON.stringify(result, null, " "));
});

router.post("/", authMiddleware, async (request, response) => {
  const { error } = modelMovie.validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  const genre = await dbGenres.getGenre(request.body.genreId);
  if (!genre)
    return response.status(404).send("The genre with such Id does not exist");
  const result = await dbMovies.createMovie(
    request.body.title,
    request.body.numberInStock,
    request.body.dailyRentalRent,
    {
      _id: genre._id,
      name: genre.name
    }
  );
  response.send(JSON.stringify(result, null, " "));
});

router.put("/:id", authMiddleware, async (request, response) => {
  const { error } = modelMovie.validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  const genre = await dbGenres.getGenre(request.body.genreId);
  if (!genre)
    return response.status(404).send("The genre with such Id does not exist");

  const result = await dbMovies.updateMovie(
    request.params.id,
    request.body.title,
    request.body.numberInStock,
    request.body.dailyRentalRent,
    {
      _id: genre._id,
      name: genre.name
    }
  );
  if (!result)
    return response.status(404).send("The movie with such Id does not exist");

  response.send(JSON.stringify(result, null, " "));
});

router.delete("/:id", authMiddleware, async (request, response) => {
  const { error } = modelMovie.validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  const result = await dbMovies.removeMovie(request.params.id);
  if (!result)
    return response.status(404).send("The movie with such Id does not exist");

  response.send(JSON.stringify(result, null, " "));
});

module.exports = router;
