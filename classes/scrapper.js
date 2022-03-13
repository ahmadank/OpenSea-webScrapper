const Crawler = require("crawler");
// var interval = setInterval(que(),1800000)
var price ="NOT WORKING";
const c = new Crawler({
  maxConnections: 10,
  callback: async (error, res, done) => {
    
    if (error) throw error;
    try{
    price = JSON.parse(res.body).stats.floor_price;
    }catch{
      price = "No price"
    }
    done();
  },
});

function que(project) {
  console.log(project)
    c.queue([
      {
        uri: getLink(project),
        jQuery: false,
      },
    ]);

    return c.on("drain", () => price);

}

function getLink(name) {
  return "https://api.opensea.io/collection/" + name + "/stats";
}

exports.que = que