const { errorHandler, notFound } = require("../middleware/error");
const Event = require("../models/Event");
const asyncHandler = require("express-async-handler");

// @route POST /event/schedule/past
// @desc search for entries in the database and returns the past schedules
// @access Private
const pastSchedule = asyncHandler(async (req, res) => {
    const userURL = req.params.userURL;
    const schedule = await Event.find( {
        userURL : userURL,
        eventDate: {
            $lt: new Date(Date.now())
        }
    });
    // As schedule return [] if there's no event document for user
    if(Object.entries(schedule).length === 0){
        throw new Error("not defined");
    }
    else{
        res.json(schedule);
    }
});

module.exports = pastSchedule;