require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");

// EXPRESS CONFIG
const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//VIEW ENGINE | this will get scrapped for React later
app.set("view-engine", "ejs");

//DATABASE
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database successfully connected."));

//MIDDLEWARE
app.use(
  session({
    secret: process.env.SESSION_SECRET || "cookie cat",
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 600000 },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//configure local strategy for passport
require("./middleware/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (req.user) {
    console.log(req.user.email, "=> [", req.url, "] @", Date.now());
  }
  next();
});

//API ROUTES
const apiRoutes = require("./api/apiRoutes");
app.use("/api", apiRoutes);

//if in production, serve static front end
//SET REACT BUILD FOLDER
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log("App listening @ port:" + port);
});
