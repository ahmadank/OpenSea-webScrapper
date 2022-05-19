const express = require("express");
const router = express.Router();
const dataBase = require("../classes/dataBase");
const projectInfo = require("../classes/projectInfo");

router.get("/", main);

async function main(req, res) {
  if (!req.session.uniqueId) await dataBase.setCustomId(req);
  projectInfo.setProjects(req.session.projects);
  promisePrices = await projectInfo.getInfo();
  (promisePrices) ? promisePrices = Array.from(promisePrices) : promisePrices = []
  res.render("pages/index", { projects: promisePrices, secretKey: req.session.uniqueId });
}

async function sendData(){
  promisePrices = await projectInfo.getInfo();
  console.log(promisePrices);
}
module.exports = router;
