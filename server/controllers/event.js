const Event = require("../models/Event");
const asyncHandler = require("express-async-handler");
// @route POST /event
// @desc create an entry for the Event
// @access Private

// We need to send the eventDate with suffix "z" meaning zero time zone.
const event = asyncHandler(async (req, res, next) => {
    const eventDocument = new Event({
        userURL : req.body.userURL,
        eventDuration : req.body.eventDuration,
        eventDate : new Date(req.body.eventDate),
        eventLink : req.body.eventLink
    });

    const savedPost = await eventDocument.save();
    res.status(201).json(savedPost);
});

module.exports = event;