const info = require("./scrapper");

function changeInterval(x) {
  clearInterval(interval);
  setInterval(function () {
    console.log(x);
  }, x);
}

exports.changeInterval = changeInterval;
