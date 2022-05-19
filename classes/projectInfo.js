const info = require("./scrapper");

let projects = [];
var interval = setInterval(() => getInfo(), 1800000);

function setProjects(lsProjects) {
  projects = lsProjects;
}

async function getInfo() {
  info.clearSet();
  const myPromise = new Promise(async (resolve, reject) => {
    projects.forEach(async (project) => {
      resolve(await info.que(project))
    })
  })
  return myPromise
}

function changeInterval(someInterval) {
  clearInterval(interval);
  interval = setInterval(() => getInfo(), someInterval);
}

exports.getInfo = getInfo;
exports.setProjects = setProjects;
exports.changeInterval = changeInterval;
