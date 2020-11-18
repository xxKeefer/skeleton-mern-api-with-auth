const express = require("express");
let router = express.Router();
const { examplePublic, examplePrivate } = require("../../controller/example");
const { authorise } = require("../../middleware/auth");

router.route("/public").get(examplePublic);

router.route("/private").get(authorise, examplePrivate);

module.exports = router;
