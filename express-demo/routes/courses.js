const express = require("express");
const Joi = require("joi");
const router = express.Router();

const courses = [
  { id: 1, name: "C++ and beyond", author: "Kathrin Maroon" },
  { id: 2, name: "JSON for beginners", author: "Maria Nordica" },
  { id: 3, name: "Mongo and mango", author: "Akapulko Jister" }
];

router.get("/", (request, response) => {
  response.send(JSON.stringify(courses, null, " "));
});

router.get("/:id", (request, response) => {
  const course = courses.filter(x => x.id === parseInt(request.params.id))[0];
  if (!course)
    return response.status(404).send("The course with such Id does not exist");

  response.send(JSON.stringify(course, null, " "));
});

router.post("/", (request, response) => {
  const { error } = validateCourse(request.body);

  if (error) return response.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: request.body.name,
    author: request.body.author
  };
  courses.push(course);
  response.send(JSON.stringify(course, null, " "));
});

router.put("/:id", (request, response) => {
  const course = courses.filter(x => x.id === parseInt(request.params.id))[0];
  if (!course)
    return response.status(404).send("The course with such Id does not exist");

  const { error } = validateCourse(request.body);

  if (error) return response.status(400).send(error.details[0].message);

  course.name = request.body.name;
  course.author = request.body.author;

  response.send(JSON.stringify(course, null, " "));
});

router.delete("/:id", (request, response) => {
  const course = courses.filter(x => x.id === parseInt(request.params.id))[0];
  if (!course)
    return response.status(404).send("The course with such Id does not exist");

  courses.splice(courses.indexOf(course), 1);
  response.send(JSON.stringify(course, null, " "));
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(5)
      .required(),
    author: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}

module.exports = router;
