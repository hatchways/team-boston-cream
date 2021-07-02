const express = require("express");
const router = express.Router();
const event  = require("../controllers/event");
const schedule = require("../controllers/schedule");
const upcomingSchedule = require("../controllers/upcomingSchedule");
const pastSchedule = require("../controllers/pastSchedule");

router.route("/").post(event);

// Will get all the events (past and future)
router.route("/schedule/:userURL").get(schedule);

router.route("/schedule/upcoming/:userURL").get(upcomingSchedule);
router.route("/schedule/past/:userURL").get(pastSchedule);

module.exports = router;