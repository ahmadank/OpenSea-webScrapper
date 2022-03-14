const info = require("./scrapper");

let projects = [];
var interval = setInterval(() => getInfo(), 1800000);

function setProjects(lsProjects) {
  console.log(lsProjects);
  projects = lsProjects;
}

async function getInfo() {
  let arr = [];
  info.clearSet();
  projects.forEach(async (project) => {
    arr.push(await info.que(project));
  });

  return arr;
}

function changeInterval(someInterval) {
  clearInterval(interval);
  interval = setInterval(() => getInfo(), someInterval);
}

exports.getInfo = getInfo;
exports.setProjects = setProjects;
exports.changeInterval = changeInterval;
