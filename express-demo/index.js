const headerMiddleware = require("./middleware/headerMiddleware");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
//[Environment]::SetEnvironmentVariable("DEBUG","app:startup")
const startupDebuger = require("debug")("app:startup");
//routes
const coursesRoutes = require("./routes/courses");
const homeRoutes = require("./routes/home");
const genresRoutes = require("./routes/genres");

const app = express();
//use templating engine
app.set("view engine", "pug");
app.set("views", "./views");
//middleware for imput mapping
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// custom own middleware
app.use(headerMiddleware);
//HTTP headers
app.use(helmet());
//HTTP requests logger
if (app.get("env") === "development") {
  startupDebuger("Morgan logging is enabled");
  app.use(morgan("tiny"));
}
//register routes
app.use("/api/courses", coursesRoutes);
app.use("/api/genres", genresRoutes);
app.use("/", homeRoutes);
//Strt application
const port = process.env.PORT || 4546;
app.listen(port, () => {
  startupDebuger(`${config.get("name")} lisenning on port :${port} ....`);
});
