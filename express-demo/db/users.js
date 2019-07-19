const mongoose = require("mongoose");
const modelGenre = require("../models/user");

const User = mongoose.model("User", modelGenre.schema);

module.exports.getUser = async function getUser(email) {
  const user = await User.findOne({ email: email });
  return user;
};

module.exports.createUser = async function createUser(user) {
  const userMongo = new User(user);
  return await userMongo.save();
};

module.exports.removeUser = async function removeUser(id) {
  return await User.findByIdAndRemove({ _id: id });
};
