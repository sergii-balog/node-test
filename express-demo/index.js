const Joi = require("joi");
const express = require("express");

const app = express();

const courses = [
  { id: 1, name: "C++ and beyond", author: "Kathrin Maroon" },
  { id: 2, name: "JSON for beginners", author: "Maria Nordica" },
  { id: 3, name: "Mongo and mango", author: "Akapulko Jister" }
];

app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h3>Express server</h3>");
});

app.get("/api/courses", (request, response) => {
  response.send(JSON.stringify(courses, null, " "));
});

app.get("/api/courses/:id", (request, response) => {
  const course = courses.filter(x => x.id === parseInt(request.params.id))[0];
  if (!course)
    return response.status(404).send("The course with such Id does not exist");

  response.send(JSON.stringify(course, null, " "));
});

app.post("/api/courses", (request, response) => {
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

app.put("/api/courses/:id", (request, response) => {
  const course = courses.filter(x => x.id === parseInt(request.params.id))[0];
  if (!course)
    return response.status(404).send("The course with such Id does not exist");

  const { error } = validateCourse(request.body);

  if (error) return response.status(400).send(error.details[0].message);

  course.name = request.body.name;
  course.author = request.body.author;

  response.send(JSON.stringify(course, null, " "));
});

app.delete("/api/courses/:id", (request, response) => {
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

const port = process.env.PORT || 4546;

app.listen(port, () => {
  console.log(`Express lisenning on port ${port} ....`);
});
