const info = require("./scrapper");

function queProject(user){
  user.projects.forEach(project => {
    let test = info.que(project)
    console.log(test +" THIS ONE?")
  });
}
function popProject(name) {
    let data = fs.readFileSync("./projects.txt", "utf8");
    data = JSON.parse(data);
    let index = data.indexOf(name);
    if (index >= 0) {
      data.splice(index, 1);
      fs.writeFileSync("./projects.txt", JSON.stringify(data));
    }
  }

exports.queProject = queProject;
exports.popProject = popProject;