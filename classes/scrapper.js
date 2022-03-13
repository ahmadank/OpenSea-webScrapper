const Crawler = require("crawler");
// var interval = setInterval(que(),1800000)
let prices = new Set();

const c = new Crawler({
  maxConnections: 10,
  callback: async (error, res, done) => {
    
    if (error) throw error;
    try{
    console.log(res.uri)
    prices.add([res.uri.path, JSON.parse(res.body).stats.floor_price])
    }catch{
      prices.add([res.uri.path, "Error"])
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
    return new Promise(resolve => {
      c.on("drain", () => resolve(prices));
    });
}

function getLink(name) {
  return "https://api.opensea.io/collection/" + name + "/stats";
}

exports.que = que