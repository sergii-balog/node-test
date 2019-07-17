const mongoose = require("mongoose");

var options = {
  user: "mongoadmin",
  pass: "!QAZ2wsx",
  useNewUrlParser: true
};

mongoose
  .connect("mongodb://localhost/mongo-exersises?authSource=admin", options)
  .then(() => console.log("Connected to mongo db..."))
  .catch(ex => console.error(ex.message));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
});
const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return Course.find({
    isPublished: true,
    tags: { $in: ["backend"] }
  })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}
getCourses().then(result => console.log(result));

setTimeout(() => {
  process.exit();
}, 1000);
