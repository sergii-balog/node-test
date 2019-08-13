const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const dbUser = require("../db/users");
const modelUser = require("../models/user");
const authMiddleware = require("../middleware/auth");

router.get("/me", authMiddleware, async (request, response) => {
  let user = await dbUser.getUserById(request.user._id);
  response.send(user);
});

router.post("/", async (request, response) => {
  const { error } = modelUser.validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  let user = await dbUser.getUser(request.body.email);
  if (user) return response.status(400).send("Such user already registered");
  user = _.pick(request.body, ["name", "email", "password"]);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const result = await dbUser.createUser(user);
  const token = modelUser.generateAuthToken(user);

  response
    .header("X-Auth-Token", token)
    .header("access-control-expose-headers", "X-Auth-Token")
    .send(JSON.stringify(_.pick(result, ["name", "email", "_id"]), null, " "));
});

module.exports = router;
