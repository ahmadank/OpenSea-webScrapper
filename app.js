const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require("path");

const crawlerRouter = require("./routes/crawler");
const dataBase = require("./routes/dataBase");
const PORT = process.env.PORT || 5000;
// const PORT = 3000;

const app = express();

const store = new MongoDBStore({
	uri: process.env.MONGOLAB_URI
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

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/webScrapper',
  err => {
      if(err) throw err;
      console.log('connected to MongoDB')
  });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
});
