const info = require("./projectInfo");
const Session = require("../SessionModel");
const generator = require("generate-password");
const mongoose = require("mongoose");

async function queProjects(user) {
  info.setProjects(user.projects);
}  

function popProject(user, project) {
  const index = user.projects.indexOf(project);
  console.log(index)
  if (index > -1) user.projects.splice(index, 1);
  return user;
}

function addProject(user, project) {
    if(user.projects.indexOf(project) < 0 )
      return user.projects.push(project.toLowerCase());
}

async function setCustomId(req) {
  unique = true;
  var passwords = generator.generateMultiple(3, {
    length: 10,
  });
  const isUnique = await Session.find({ "session.uniqueId": "" });
  if (isUnique.length > 0) unique = false;
  if (unique) req.session.uniqueId = passwords.join("-");
  console.log(unique, "Setting" + passwords);
  req.session.projects=[]
  return req;
}

async function recoverData(user, code) {
  const session = await Session.findOne({ "session.uniqueId": code });
  if (session) {
    user.uniqueId = session.uniqueId;
    user.projects = session.projects
    session._id = new mongoose.Types.ObjectId();
    await session.remove({})
    return user
  }
  return false
}
exports.queProject = queProjects;
exports.popProject = popProject;
exports.addProject = addProject;
exports.recoverData = recoverData;
exports.setCustomId = setCustomId;
