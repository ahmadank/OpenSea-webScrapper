const Crawler = require("crawler");
// var interval = setInterval(que(),1800000)
var price ="";
const c = new Crawler({
  maxConnections: 10,
  callback: async (error, res, done) => {
    
    if (error) throw error;
    try{
    console.log(res)
    price = JSON.parse(res.body).stats.floor_price;
    }catch{
      price = "No price"
    }
    console.log(price)
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
    return new Promise(resolve => {
      c.on("drain", () => resolve(price));
    });
}

function getLink(name) {
  return "https://api.opensea.io/collection/" + name + "/stats";
}

exports.que = que