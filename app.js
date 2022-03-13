const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require("path");

const crawlerRouter = require("./routes/crawler");
const dataBase = require("./routes/dataBase");
const PORT = process.env.PORT || 3000;


const app = express();
const uri = process.env.MONGOLAB_URI


const store = new MongoDBStore({
	uri: uri,
	collection: 'sessions'
});

app.use(session({
	secret: 'some secret here',
	store: store,
  resave: true,
  saveUninitialized: false
}))

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', function (req, res) {
  res.render('pages/index')
});

app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

async function main(){;
  try {
    mongoose.connect( uri, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
    console.log("connected"));    
    }catch (error) { 
    console.log("could not connect");    
  }  

const db = mongoose.connection;
db.on("error", (err) => console.log(`Connection error ${err}`));
db.once('open', function () {
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
});
}

main()