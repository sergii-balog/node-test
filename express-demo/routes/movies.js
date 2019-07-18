const express = require("express");
const Joi = require("joi");
const router = express.Router();
const dbMovies = require("../db/movies");
const dbGenres = require("../db/genres");

router.get("/", async (request, response) => {
  console.log("inside");
  const result = await dbMovies.getAllMovies();
  response.send(JSON.stringify(result, null, " "));
});

router.get("/:id", async (request, response) => {
  const result = await dbMovies.getMovie(request.params.id);
  if (!result)
    return response.status(404).send("The movie with such Id does not exist");
  response.send(JSON.stringify(result, null, " "));
});

router.post("/", async (request, response) => {
  const { error } = validateMovie(request.body);
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

router.put("/:id", async (request, response) => {
  const { error } = validateMovie(request.body);
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

router.delete("/:id", async (request, response) => {
  const { error } = validateMovie(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  const result = await dbMovies.removeMovie(request.params.id);
  if (!result)
    return response.status(404).send("The movie with such Id does not exist");

  response.send(JSON.stringify(result, null, " "));
});

function validateMovie(movie) {
  const schema = {
    title: Joi.string()
      .min(5)
      .required(),
    numberInStock: Joi.number().default(0),
    dailyRentalRent: Joi.number().default(0),
    genreId: Joi.string().required()
  };
  return Joi.validate(movie, schema);
}

module.exports = router;
