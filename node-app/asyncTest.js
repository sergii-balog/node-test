console.log("Before");
callDb(dbObject => console.log("Get result", dbObject));
console.log("After");

function callDb(callback) {
  setTimeout(() => {
    console.log("Executed...");
    callback({ id: 25, title: "Baraboshka" });
  }, 600);
}
