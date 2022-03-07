var express = require("express");
var router = express.Router();
const fs = require('fs');

const Crawler = require("crawler");
// var interval = setInterval(que(),1800000)

const c = new Crawler({
  maxConnections: 10,
  callback: async (error, res, done) => {
    outgoingLinks = [];
    if (error) throw error;
    console.log(JSON.parse(res.body).stats.floor_price)
    done();
  }
});
que()
function que(){
  const data = fs.readFileSync('./projects.txt', 'utf8')
  JSON.parse(data).forEach(project => {
    c.queue([{
    uri: getLink(project),
    jQuery: false}])
  }) 
}

function getLink(name){
  return 'https://api.opensea.io/collection/' + name + '/stats'
}


function changeInterval(x){
  clearInterval(interval);
  setInterval(function(){ console.log(x)},x)
}



module.exports = router;

