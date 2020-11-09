const express = require("express");
let router = express.Router();
const { renderPublic, renderPrivate } = require("../controller/example");
const { authorise } = require("../middleware/auth");

router.route("/public").get(renderPublic);

router.route("/private").get(authorise, renderPrivate);

module.exports = router;
