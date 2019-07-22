const logger = require("../startup/logging").logger;
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
