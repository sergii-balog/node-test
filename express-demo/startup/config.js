const config = require("config");
const startupDebugger = require("debug")("app:startup");

module.exports = function() {
  //[Environment]::SetEnvironmentVariable("DEBUG","app:startup") // export DEBUG=app:startup
  // check required environment
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
  }
};
module.exports.startupDebugger = startupDebugger;
