// const p = new Promise((resolve, reject) => {
//   try {
//     let result = {};
//     // .... Some work
//     setTimeout(() => {
//       resolve(result);
//     }, 1000);
//   } catch (ex) {
//     reject(ex);
//   }
// });

// p.then(result => console.log(result)).catch(error =>
//   console.log(error.message)
// );

function callDb() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("User retrieved...");
      resolve({ id: 25, gitHubAccount: "Baraboshka" });
    }, 2000);
  });
}

function getRepos(userName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Repos provided...");
      resolve(["some", "repos"]);
    }, 2000);
  });
}

function getCommits(repoName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Commits provided...");
      resolve(["commit1", "commit2"]);
    }, 2000);
  });
}
console.log("Before");
callDb()
  .then(user => {
    console.log(user);
    return getRepos(user.gitHubAccount);
  })
  .then(repos => {
    console.log(repos);
    return getCommits(repos[0]);
  })
  .then(commits => console.log(commits))
  .catch(err => console.log(err.message));
console.log("After");

// Parallel promises

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Operation 1");
    resolve({ result: 1 });
  }, 1000);
});

const p2 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Operation 2");
    resolve({ result: 2 });
  }, 1000);
});

Promise.all([p1, p2]).then(result => console.log(result));
Promise.race([p1, p2]).then(result => console.log(result));

// Async / Await approach

async function displayCommits() {
  try {
    const user = await callDb();
    const repos = await getRepos(user.gitHubAccount);
    const commits = await getCommits(repos[0]);
    throw new Error("Something wrong...");
    console.log(user, repos, commits);
  } catch (ex) {
    console.error(ex.message);
  }
}
displayCommits();
