const express = require("express");
let router = express.Router();

const auth = require("./routes/auth");
const example = require("./routes/example");

router.use("/auth", auth);
router.use("/example", example);

router.route("/").get((req, res) => {
  const user = req.user;
  res.render("index.ejs", { user: user });
});

module.exports = router;
