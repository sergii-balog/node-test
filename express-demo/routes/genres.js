const express = require("express");
const Joi = require("joi");
const router = express.Router();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Science Fiction" },
  { id: 3, name: "Horror" }
];

router.get("/", (request, response) => {
  response.send(JSON.stringify(genres, null, " "));
});

router.get("/:id", (request, response) => {
  const course = genres.filter(x => x.id === parseInt(request.params.id))[0];
  if (!course)
    return response.status(404).send("The genre with such Id does not exist");

  response.send(JSON.stringify(course, null, " "));
});

router.post("/", (request, response) => {
  const { error } = validateGenre(request.body);

  if (error) return response.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: request.body.name
  };
  genres.push(genre);
  response.send(JSON.stringify(genre, null, " "));
});

router.put("/:id", (request, response) => {
  const genre = genres.filter(x => x.id === parseInt(request.params.id))[0];
  if (!genre)
    return response.status(404).send("The genre with such Id does not exist");

  const { error } = validateGenre(request.body);

  if (error) return response.status(400).send(error.details[0].message);

  genre.name = request.body.name;

  response.send(JSON.stringify(genre, null, " "));
});

router.delete("/:id", (request, response) => {
  const genre = genres.filter(x => x.id === parseInt(request.params.id))[0];
  if (!genre)
    return response.status(404).send("The course with such Id does not exist");

  genres.splice(genres.indexOf(genre), 1);
  response.send(JSON.stringify(genre, null, " "));
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
