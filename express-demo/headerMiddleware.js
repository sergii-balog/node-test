function headerMiddleware(request, response, next) {
  response.header("X-Node-Middleware", "Express header middleware");
  response.removeHeader("X-Powered-By");
  next();
}

module.exports = headerMiddleware;
