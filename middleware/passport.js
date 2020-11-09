const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

const canLogin = (user, password) => {
  if (user) {
    return user.verifyPasswordSync(password);
  } else {
    return false;
  }
};

const verifyCallback = async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (canLogin(user, password)) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    done(error);
  }
};

const fields = { usernameField: "email" };

passport.use(new LocalStrategy(fields, verifyCallback));
