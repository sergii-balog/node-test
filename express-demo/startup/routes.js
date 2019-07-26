const express = require("express");
//routes
const coursesRoutes = require("../routes/courses");
const homeRoutes = require("../routes/home");
const genresRoutes = require("../routes/genres");
const clientRoutes = require("../routes/clients");
const movieRoutes = require("../routes/movies");
const rentalRoutes = require("../routes/rentals");
const userRoutes = require("../routes/users");
const authRoutes = require("../routes/auth");
const cartRoutes = require("../routes/cart");
const helmet = require("helmet");
const morgan = require("morgan");
const headerMiddleware = require("../middleware/header");
const errorMiddleware = require("../middleware/error");

module.exports = function(app, startupDebugger) {
  //middleware for input mapping
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  // custom own middleware
  app.use(headerMiddleware);
  //HTTP headers
  app.use(helmet());
  //HTTP requests logger
  if (app.get("env") === "development") {
    startupDebugger("Morgan logging is enabled");
    app.use(morgan("tiny"));
  }
  //register routes
  app.use("/api/courses", coursesRoutes);
  app.use("/api/genres", genresRoutes);
  app.use("/api/clients", clientRoutes);
  app.use("/api/movies", movieRoutes);
  app.use("/api/rentals", rentalRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/cart", cartRoutes);
  app.use("/", homeRoutes);

  app.use(errorMiddleware);
};
