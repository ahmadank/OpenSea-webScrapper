const info = require("./projectInfo");

async function queProjects(user) {
  info.setProjects(user.projects);
  // await info.getInfo(user.projects);
}

function popProject(user, project) {
  const index = user.projects.indexOf(project);
  if (index > -1) user.projects.splice(index, 1);
  return user;
}

function addProject(user, project) {
  info.changeInterval(1000);
  return user.projects.push(project);
}

exports.queProject = queProjects;
exports.popProject = popProject;
exports.addProject = addProject;
