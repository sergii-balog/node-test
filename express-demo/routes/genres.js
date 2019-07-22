const express = require("express");
const router = express.Router();
const dbGenres = require("../db/genres");
const modelGenre = require("../models/genre");
const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");

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

router.post("/", authMiddleware, async (request, response) => {
  const { error } = modelGenre.validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  const result = await dbGenres.createGenre(request.body.name);
  response.send(JSON.stringify(result, null, " "));
});

router.put("/:id", authMiddleware, async (request, response) => {
  const { error } = modelGenre.validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);
  const result = await dbGenres.updateGenre(
    request.params.id,
    request.body.name
  );
  if (!result)
    return response.status(404).send("The genre with such Id does not exist");

  response.send(JSON.stringify(result, null, " "));
});

router.delete(
  "/:id",
  [authMiddleware, adminMiddleware],
  async (request, response) => {
    throw new Error("Test");
    const { error } = modelGenre.validate(request.body);
    if (error) return response.status(400).send(error.details[0].message);

    const result = await dbGenres.removeGenre(request.params.id);
    if (!result)
      return response.status(404).send("The genre with such Id does not exist");

    response.send(JSON.stringify(result, null, " "));
  }
);

module.exports = router;
