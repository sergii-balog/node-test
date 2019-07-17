const mongoose = require("mongoose");

var options = {
  user: "mongoadmin",
  pass: "!QAZ2wsx",
  useNewUrlParser: true
};

mongoose
  .connect("mongodb://localhost/playground?authSource=admin", options)
  .then(() => console.log("Connected to mongo db..."))
  .catch(ex => console.error(ex.message));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model("Course", courseSchema);

const course = new Course({
  name: "Angular",
  author: "Mosh Hamedani",
  tags: ["angular", "frontend"],
  isPublished: true
});

async function createCourse() {
  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const result = await Course.find({ author: /^Mosh/ })
    .limit(3)
    .sort({ name: 1 })
    .select({ name: 1, author: 1, tags: 1 })
    .countDocuments();
  console.log(result);
}
async function updateCourse(id) {
  //   const course = await Course.findById(id);
  //   if (!course) return;
  //   course.isPublished = true;
  //   course.author = "S.B.";
  //   const result = await course.save();
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "New Author",
        isPublished: false
      }
    },
    { new: true }
  );
  console.log(result);
}
async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}
//getCourses();
//createCourse();
//updateCourse("5d2f6ffe7352ca97ac7fe085");
removeCourse("5d2f6ffe7352ca97ac7fe085");

setTimeout(() => {
  process.exit();
}, 2000);
