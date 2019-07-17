const express = require("express");
const config = require("config");
const router = express.Router();

router.get("/", (request, response) => {
  //response.send(config.get("htmlContants.welcomeHtml"));
  response.render("index", {
    title: config.get("htmlContants.welcomeHtml"),
    message: config.get("htmlContants.welcomeHtml")
  });
});

router.get("/ping", (request, response) => {
  response.render("index", {
    title: config.get("htmlContants.pong"),
    message: config.get("htmlContants.pong")
  });
});

module.exports = router;
