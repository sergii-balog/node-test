function headerMiddleware(request, response, next) {
  response.header("X-Node-Middleware", "Express header middleware");
  response.removeHeader("X-Powered-By");
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "*");
  next();
}

module.exports = headerMiddleware;
