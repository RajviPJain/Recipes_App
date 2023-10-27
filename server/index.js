const express = require("express");
const cors = require("cors");
const app = express();
require("./config/db");
var session = require("express-session");
const passport = require("passport");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
require("dotenv").config();

app.use(passport.initialize());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {  maxAge: 3600000,secure: false },
  })
);

app.use(passport.session());

const port = process.env.PORT || "3000";

const Routes = require("./routes/index");
Routes.forEach((route) => app.use(route.path, route.router));

app.listen(port, () => {
  console.log(` app is listening on port ${port}`);
});