const { errorHandler, notFound } = require("../middleware/error");
const Event = require("../models/Event");
const asyncHandler = require("express-async-handler");

// @route POST /event/schedule/upcoming
// @desc search for entries in the database and returns coming schedules
// @access Private
const upcomingSchedule = asyncHandler(async (req, res) => {
    const userURL = req.params.userURL;
    const schedule = await Event.find( {
        userURL : userURL,
        eventDate: {$gte: new Date(Date.now())}
    });
    // As schedule return [] if there's no event document for user
    if(Object.entries(schedule).length === 0){
        throw new Error("not defined");
    }
    else{
        res.json(schedule);
    }
});

module.exports = upcomingSchedule;