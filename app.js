var express = require("express");
// const session = require('express-session')
var path = require("path");

var crawlerRouter = require("./routes/crawler");
const PORT = process.env.PORT || 5000;

var app = express();

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


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
console.log("Server is up")