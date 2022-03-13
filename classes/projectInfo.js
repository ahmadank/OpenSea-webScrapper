const info = require("./scrapper");

async function getInfo(projects){
  let arr =[];
  info.clearSet()
  await user.projects.forEach(async project => {
    arr.push(await info.que(project))

  });
}
function changeInterval(x) {
  clearInterval(interval);
  setInterval(function () {
    console.log(x);
  }, x);
}

exports.getInfo = getInfo;
exports.changeInterval = changeInterval;
