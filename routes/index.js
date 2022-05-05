const express = require("express");
const router = express.Router();
const dataBase = require("../classes/dataBase");

router.get("/", main);

async function main(req, res) {
  if (!req.session.uniqueId) await dataBase.setCustomId(req);
res.render("pages/index");
}


module.exports = router;
