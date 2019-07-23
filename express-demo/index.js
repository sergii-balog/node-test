const express = require("express");
const config = require("config");

const app = express();
const startupDebugger = require("./startup/config").startupDebugger;
require("./startup/config")();
require("./startup/logging")();
require("./startup/db")(startupDebugger);
require("./startup/routes")(app, startupDebugger);
require("./startup/views")(app);
require("./startup/validation")();

//Start application
const port = process.env.PORT || 4546;
const server = app.listen(port, () => {
  startupDebugger(`${config.get("name")} listening on port :${port} ....`);
});

module.exports.server = server;
