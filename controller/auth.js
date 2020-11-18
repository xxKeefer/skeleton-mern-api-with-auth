const User = require("../models/user");
const passport = require("passport");

//MODEL & SESSION FUNCTIONS
const createUser = async (req, res, next) => {
  const handleNewUser = (user) => {
    req.login(user, (err) => {
      if (err) {
        next(err);
      } else {
        res.status(201).json(user);
      }
    });
  };

  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    handleNewUser(user);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
};

const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({ message: "session destroyed." });
  });
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
};
