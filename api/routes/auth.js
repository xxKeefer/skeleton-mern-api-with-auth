const express = require("express");
let router = express.Router();
const {
  createUser,
  loginUser,
  logoutUser,
  renderLogin,
  renderSignup,
} = require("../../controller/auth");
const { authRedirect } = require("../../middleware/auth");

router.route("/signup").get(authRedirect, renderSignup).post(createUser);

router.route("/login").get(authRedirect, renderLogin).post(loginUser);

router.route("/logout").get(logoutUser);

module.exports = router;
