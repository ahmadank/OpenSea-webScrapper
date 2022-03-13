const Crawler = require("crawler");
// var interval = setInterval(que(),1800000)

const c = new Crawler({
  maxConnections: 10,
  callback: async (error, res, done) => {
    let results = JSON.parse(res.body)
    if (error) throw error;
    console.log(results.stats.floor_price);
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
}

function getLink(name) {
  return "https://api.opensea.io/collection/" + name + "/stats";
}

exports.que = que