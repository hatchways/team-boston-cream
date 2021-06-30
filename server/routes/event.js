const express = require("express");
const router = express.Router();
const event  = require("../controllers/event");
const schedule = require("../controllers/schedule");

router.route("/").post(event);

router.route("/schedule/:userURL").get(schedule);

module.exports = router;