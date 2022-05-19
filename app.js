const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const http = require('http')
const path = require("path");


const dataBase = require("./classes/dataBase");
const PORT = process.env.PORT || 3000;

const app = express();
var server = http.createServer(app);
const uri =
  process.env.MONGOLAB_URI
const store = new MongoDBStore({
  uri: uri,
  collection: "sessions",
});


app.use(
  session({
    secret: process.env.SESSION_KEY || "secretMsg",
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", require("./routes/index.js"));
app.use("/handler", require("./routes/projectHandler.js"));

app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

async function main() {
  try {
    mongoose.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log("connected")
    );
  } catch (error) {
    console.log("could not connect");
  }

  const db = mongoose.connection;
  db.on("error", (err) => console.log(`Connection error ${err}`));
  db.once("open", function () {
    server.listen(PORT, () => {
      console.log(`Listening on ${PORT}`)
    });
  });

  const io = require('socket.io')(server)
  io.on("connection", socket =>{
  console.log("this is from socket")
})
}

main();
