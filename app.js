require("dotenv").config();

// mongoose start
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MLAB_URI, {
    auth: {
      user: process.env.MLAB_USER,
      password: process.env.MLAB_PASS
    },
    useNewUrlParser: true
  })
  .catch(err => console.error(`ERROR: ${err}`));
// mongoose end

const express = require("express");
const path = require("path");

const app = express();

// Body parser

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// End Parser

// Our views path
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use("/css", express.static("assets/styles"));
app.use("/js", express.static("assets/scripts"));
app.use("/images", express.static("assets/images"));
// our routes

const routes = require("./routes");
app.use("/", routes);

const port = process.env.PORT || 4000;

app.listen(process.env.PORT || 4000, () =>
  console.log(`Listening on port ${port}...`)
);
