const mongoose = require("mongoose");
const modelGenre = require("../models/user");

const User = mongoose.model("User", modelGenre.schema);

module.exports.getUser = async function getUser(email) {
  const user = await User.findOne({ email: email });
  return user;
};
module.exports.getUserById = async function getUserById(id) {
  const user = await User.findOne({ _id: id }).select("-password -__v");
  return user;
};

module.exports.createUser = async function createUser(user, token) {
  const userMongo = new User(user);
  const result = await userMongo.save();
  return result;
};

module.exports.removeUser = async function removeUser(id) {
  return await User.findByIdAndRemove({ _id: id });
};
