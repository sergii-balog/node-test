const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" })
  ]
});
function errorMiddleware(err, request, response, next) {
  logger.log({ level: "info", message: err.message });
  response.status(500).send({
    status: "error",
    message: "Unexpected error",
    details: err.message,
    stack: err.stack
  });
}

module.exports = errorMiddleware;
