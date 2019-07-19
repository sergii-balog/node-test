const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const config = require("config");
const router = express.Router();
const dbUser = require("../db/users");
const modelAuth = require("../models/auth");
const modelUser = require("../models/user");

router.post("/", async (request, response) => {
  const { error } = modelAuth.validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  let user = await dbUser.getUser(request.body.email);
  if (!user) return response.status(400).send("Invalid email or password");

  const isPasswordValid = await bcrypt.compare(
    request.body.password,
    user.password
  );
  if (!isPasswordValid)
    return response.status(400).send("Invalid email or password");

  const token = modelUser.generateAuthToken(user);
  response.send({ result: "ok", token: token });
});

module.exports = router;
