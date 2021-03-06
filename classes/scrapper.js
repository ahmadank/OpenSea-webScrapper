const Crawler = require("crawler");
let prices = new Set();

const c = new Crawler({
  maxConnections: 100,
  callback: async (error, res, done) => {
    if (error) throw error;
    try {
      let projectNm = res.options.uri.split("/");
      prices.add([
        projectNm[projectNm.length - 2],
        JSON.parse(res.body).stats.floor_price,
      ]);
    } catch {
      prices.add(["Error"]);
    }
    done();
  },
});

function que(project) {
  c.queue([
    {
      uri: getLink(project),
      jQuery: false,
    },
  ]);
  return new Promise((resolve) => {
    c.on("drain", () => {
      resolve(prices);
    });
  });
}

function clearSet() {
  prices.clear();
}
function getLink(name) {
  return "https://api.opensea.io/collection/" + name + "/stats";
}

exports.que = que;
exports.clearSet = clearSet;
