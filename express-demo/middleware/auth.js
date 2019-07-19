const config = require("config");
const jwt = require("jsonwebtoken");

function authMiddleware(request, response, next) {
  const token = request.header("X-Auth-Token");
  if (!token)
    return response.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    request.user = decoded;
    next();
  } catch (ex) {
    response.status(400).send("Invalid token.");
  }
}

module.exports = authMiddleware;
