const user = require("../../../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");

describe("user.generateAuthToken", () => {
  it("should return valid JWT", () => {
    const loggingUser = { _id: 1, isAdmin: true };
    const token = user.generateAuthToken(loggingUser);
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    expect(decoded).toMatchObject(loggingUser);
  });
});
