const headerMiddleware = require("./middleware/headerMiddleware");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const mongoose = require("mongoose");
//[Environment]::SetEnvironmentVariable("DEBUG","app:startup")
const startupDebugger = require("debug")("app:startup");
//routes
const coursesRoutes = require("./routes/courses");
const homeRoutes = require("./routes/home");
const genresRoutes = require("./routes/genres");
const clientRoutes = require("./routes/clients");

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
app.use("/", homeRoutes);
//Start application
const port = process.env.PORT || 4546;
app.listen(port, () => {
  startupDebugger(`${config.get("name")} lisenning on port :${port} ....`);
});
