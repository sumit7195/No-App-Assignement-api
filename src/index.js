const password = "Anil123";

const mongoUri = `mongodb+srv://sumit123:${password}@cluster0.ttizdli.mongodb.net/?retryWrites=true`;

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const port = 3001;

//////start Express

const app = express();

// set template engine

app.set("view engine", "ejs");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));



// start mongoose

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) =>
  console.log("Error connecting while connecting to database", error)
);

db.once("open", () => {
  console.log("database connected successfully");
});

app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

// routes

app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

module.exports = db;
