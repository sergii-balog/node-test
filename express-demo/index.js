require("express-async-errors");
const headerMiddleware = require("./middleware/header");
const errorMiddleware = require("./middleware/error");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const winston = require("winston");

//[Environment]::SetEnvironmentVariable("DEBUG","app:startup") // export DEBUG=app:startup
const startupDebugger = require("debug")("app:startup");
//routes
const coursesRoutes = require("./routes/courses");
const homeRoutes = require("./routes/home");
const genresRoutes = require("./routes/genres");
const clientRoutes = require("./routes/clients");
const movieRoutes = require("./routes/movies");
const rentalRoutes = require("./routes/rentals");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// check required environment
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect(config.get("mongo.connectionString"), config.get("mongo.options"))
  .then(() => startupDebugger("Connected to mongo db..."))
  .catch(ex => console.error(ex.message));

const app = express();
//use template engine
app.set("view engine", "pug");
app.set("views", "./views");
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
app.use("/", homeRoutes);

app.use(errorMiddleware);

//Start application
const port = process.env.PORT || 4546;
app.listen(port, () => {
  startupDebugger(`${config.get("name")} lisenning on port :${port} ....`);
});
