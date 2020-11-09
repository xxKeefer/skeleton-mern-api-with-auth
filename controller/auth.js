const User = require("../models/user");
const passport = require("passport");

//RENDER FUNCTIONS
const renderSignup = (req, res) => {
  res.render("signup.ejs");
};

const renderLogin = (req, res) => {
  res.render("login.ejs");
};

//MODEL & SESSION FUNCTIONS
const createUser = async (req, res, next) => {
  const handleNewUser = (user) => {
    req.login(user, (err) => {
      if (err) {
        next(err);
      } else {
        // res.status(201).json(user);
        res.redirect("/");
      }
    });
  };

  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    handleNewUser(user);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const loginUser = (req, res, next) => {
  const login = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  });
  login(req, res, next);
};

const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  renderLogin,
  renderSignup,
};
