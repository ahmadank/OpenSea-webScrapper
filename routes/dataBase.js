const Data = require("../UserModel.js");

// let test = new Data()
// test.username = "Admin"
// test.password = "Admin"
// test.save()

//testing that data is getting added correctly to online db
//test
let test = Data.find({},{},function(err,docs) {console.log(docs)})
