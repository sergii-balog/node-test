const express = require("express");
const Joi = require("joi");
const router = express.Router();
const dbGenres = require("../db/genres");

router.get("/", async (request, response) => {
  const result = await dbGenres.getAllGenres();
  response.send(JSON.stringify(result, null, " "));
});

router.get("/:id", async (request, response) => {
  const result = await dbGenres.getGenre(request.params.id);
  if (!result)
    return response.status(404).send("The genre with such Id does not exist");
  response.send(JSON.stringify(result, null, " "));
});

router.post("/", async (request, response) => {
  const { error } = validateGenre(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  const result = await dbGenres.createGenre(request.body.name);
  response.send(JSON.stringify(result, null, " "));
});

router.put("/:id", async (request, response) => {
  const { error } = validateGenre(request.body);
  if (error) return response.status(400).send(error.details[0].message);
  const result = await dbGenres.updateGenre(
    request.params.id,
    request.body.name
  );
  if (!result)
    return response.status(404).send("The genre with such Id does not exist");

  response.send(JSON.stringify(result, null, " "));
});

router.delete("/:id", async (request, response) => {
  const { error } = validateGenre(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  const result = await dbGenres.removeGenre(request.params.id);
  if (!result)
    return response.status(404).send("The genre with such Id does not exist");

  response.send(JSON.stringify(result, null, " "));
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(5)
      .required()
  };
  return Joi.validate(genre, schema);
}

module.exports = router;
