if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
//above loads all env variables from .env file to process.env

//add express and express layout
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
// const bodyParser = require("body-parser"); //body parser not npm installed. Instead we are using the built in method in express now. urlencoded: true..

//add routes instead of making doing it in this file
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");

//add view engine for ejs. Also add express-ejs-layout
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ limit: "10mb", extended: false})); not using this but instead below line
app.use(express.urlencoded({ limit: "10mb", extended: false }));

//add mongodb and connect to it
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to mongoose"));

//connect the routes to this server,js    || use that router
app.use("/", indexRouter);
app.use("/authors", authorRouter);

//start server on 3000 port if dev. Else process.env.PORT if production
app.listen(process.env.PORT || 3000);
