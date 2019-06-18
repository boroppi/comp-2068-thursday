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

// adding cookies and sessions support to our app
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const flash = require("connect-flash");

app.use(cookieParser());
app.use(
  sessions({
    secret: process.env.secret || "bookrakacha",
    cookie: {
      maxAge: 10800000
    },
    resave: true,
    saveUninitialized: true
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.flash = res.locals.flash || {};
  res.locals.flash.success = req.flash("success") || null;
  res.locals.flash.error = req.flash("error") || null;

  next();
});

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

// Our authentication helper
const isAuthenticated = req => {
  return req.session && req.session.userId;
};
app.use((req, res, next) => {
  req.isAuthenticated = () => {
    if (!isAuthenticated(req)) {
      req.flash("error", `You are not permitted to do this action.`);
      res.redirect("/");
    }
  };

  res.locals.isAuthenticated = isAuthenticated(req);
  next();
});
// End of our authentication helper

// our routes
const routes = require("./routes");
app.use("/", routes);

const port = process.env.PORT || 4000;

app.listen(process.env.PORT || 4000, () =>
  console.log(`Listening on port ${port}...`)
);
