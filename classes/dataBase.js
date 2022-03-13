const info = require("./scrapper");

async function queProject(user){
  info.clearSet()
  user.projects.forEach(async project => {
    let price = await info.que(project)
    console.log(price)
  });
}
function popProject(name) {
    // let data = fs.readFileSync("./projects.txt", "utf8");
    // data = JSON.parse(data);
    // let index = data.indexOf(name);
    // if (index >= 0) {
    //   data.splice(index, 1);
    //   fs.writeFileSync("./projects.txt", JSON.stringify(data));
    // }
  }

exports.queProject = queProject;
exports.popProject = popProject;