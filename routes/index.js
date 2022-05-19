const express = require("express");
const router = express.Router();
const dataBase = require("../classes/dataBase");
const projectInfo = require("../classes/projectInfo");

router.get("/", main);
router.post("/", recoverUser)
async function main(req, res) {
  if (!req.session.uniqueId) await dataBase.setCustomId(req);
  projectInfo.setProjects(req.session.projects);
  promisePrices = await projectInfo.getInfo();
  (promisePrices) ? promisePrices = Array.from(promisePrices) : promisePrices = []
  res.render("pages/index", { projects: promisePrices, secretKey: req.session.uniqueId });
}

async function recoverUser(req,res){
  await dataBase.recoverData(req.session, req.body.userCode) ? console.log("Works") : console.log("LMAO")
  main(req,res)
}

module.exports = router;
