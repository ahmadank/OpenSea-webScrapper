const Crawler = require("crawler");
// var interval = setInterval(que(),1800000)

const c = new Crawler({
  maxConnections: 10,
  callback: async (error, res, done) => {
    
    if (error) throw error;
    try{
    console.log(JSON.parse(res.body).stats.floor_price);
    }catch{
      console.log("No price")
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
      c.on("drain", resolve("Hello"));
    })

}

function getLink(name) {
  return "https://api.opensea.io/collection/" + name + "/stats";
}

exports.que = que