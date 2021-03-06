// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();
// const dbHelper = require("./db/db-helper")(db);
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(cookieSession({
  name: 'session',
  keys: ['42']
}));

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

// const usersRoutes = require('./routes/makers')
const root = require("./routes/index");
const makersRoutes = require("./routes/makers");
const takersRoutes = require("./routes/takers");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use("/user", usersRoutes(db));
app.use("/", root(db));
app.use("/makers", makersRoutes(db));
app.use("/takers", takersRoutes(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// app.get("/", (req, res) => {
//  res.render('index');
// });



app.listen(PORT, () => {
  console.log(`Quiz app listening on port ${PORT}`);
});
