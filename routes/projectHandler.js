const express = require("express");
const router = express.Router();
const dataBase = require("../classes/dataBase");

router.post("/", eventHandler)

function eventHandler(req,res){
    if(req.body.addProject){
        dataBase.addProject(req.session, req.body.addProject)
    }
    if(req.body.removeProject){
        dataBase.popProject(req.session, req.body.removeProject)
    }


    res.redirect("/")
}

module.exports = router;