require("dotenv").config();
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
const ejs = require("ejs");
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

//ROUTES
const auth = require("./routes/auth");
const example = require("./routes/example");

app.use("/auth", auth);
app.use("/example", example);
app.get("/", (req, res) => {
  const user = req.user;
  res.render("index.ejs", { user: user });
});
app.listen(port, () => {
  console.log("App listening @ port:" + port);
});
