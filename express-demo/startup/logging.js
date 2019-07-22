const winston = require("winston");
require("express-async-errors");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" })
  ]
});

module.exports = function() {
  process.on("uncaughtException", ex => {
    logger.log({
      level: "error",
      message: "Uncaught exception : " + ex.message
    });
    process.exit(1);
  });
  process.on("unhandledRejection", ex => {
    console.log("unhandled rejection : " + ex.message);
    process.exit(1);
  });
};
module.exports.logger = logger;
