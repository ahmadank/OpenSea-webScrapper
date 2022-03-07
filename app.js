var express = require("express");
var path = require("path");

var crawlerRouter = require("./routes/crawler");

var app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


app.listen(3000);
console.log("Server is up")