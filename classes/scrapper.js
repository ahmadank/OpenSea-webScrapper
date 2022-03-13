const Crawler = require("crawler");
// var interval = setInterval(que(),1800000)
let prices = new Set();

const c = new Crawler({
  maxConnections: 10,
  callback: async (error, res, done) => {
    
    if (error) throw error;
    try{
    let projectNm = res.options.uri.split('/')
    prices.add([projectNm[projectNm.length - 2 ], JSON.parse(res.body).stats.floor_price])
    }catch{
      prices.add(["Error"])
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
      c.on("drain", () => {
        resolve(prices)
        prices.clear()
      });
    });
}

function getLink(name) {
  return "https://api.opensea.io/collection/" + name + "/stats";
}

exports.que = que