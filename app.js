const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const path = require("path");

const dataBase = require("./classes/dataBase");
const PORT = process.env.PORT || 3000;

const app = express();
const uri =
  process.env.MONGOLAB_URI ||
  "mongodb+srv://ahmadank:fcjBqaIdtrGMRej0@cluster0.v2ao5.mongodb.net/users?retryWrites=true&w=majority";

const store = new MongoDBStore({
  uri: uri,
  collection: "sessions",
});

const io = socketIO(app)

io.on("connection", socket =>{
  console.log(socket.id)
})

app.use(
  session({
    secret: process.env.SESSION_KEY || "secretMsg",
    store: store,
    resave: false,
    saveUninitialized: false,
  })1
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
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  });
}

main();
