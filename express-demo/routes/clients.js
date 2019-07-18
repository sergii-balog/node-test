const express = require("express");
const Joi = require("joi");
const router = express.Router();
const dbGenres = require("../db/clients");

router.get("/", async (request, response) => {
  const result = await dbGenres.getAllClients();
  response.send(JSON.stringify(result, null, " "));
});

router.get("/:id", async (request, response) => {
  const result = await dbGenres.getClient(request.params.id);
  if (!result)
    return response.status(404).send("The client with such Id does not exist");
  response.send(JSON.stringify(result, null, " "));
});

router.post("/", async (request, response) => {
  const { error } = validateGenre(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  const result = await dbGenres.createClient(
    request.body.name,
    request.body.phone,
    request.body.isGold
  );
  response.send(JSON.stringify(result, null, " "));
});

router.put("/:id", async (request, response) => {
  const { error } = validateGenre(request.body);
  if (error) return response.status(400).send(error.details[0].message);
  const result = await dbGenres.updateClient(
    request.params.id,
    request.body.name,
    request.body.phone,
    request.body.isGold
  );
  if (!result)
    return response.status(404).send("The client with such Id does not exist");

  response.send(JSON.stringify(result, null, " "));
});

router.delete("/:id", async (request, response) => {
  const { error } = validateGenre(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  const result = await dbGenres.removeClient(request.params.id);
  if (!result)
    return response.status(404).send("The client with such Id does not exist");

  response.send(JSON.stringify(result, null, " "));
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(5)
      .required(),
    phone: Joi.string()
      .min(7)
      .required(),
    isGold: Joi.boolean().default(false)
  };
  return Joi.validate(genre, schema);
}

module.exports = router;
