const express = require("express");
let router = express.Router();

const auth = require("./routes/auth");
const example = require("./routes/example");

router.use("/auth", auth);
router.use("/example", example);

module.exports = router;
