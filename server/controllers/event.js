const Event = require("../models/Event");

// @route POST /event
// @desc create an entry for the Event in the database
// @access Private

// Need the data in json foramt and date string should end with z
// if not UTC time will be used as offset 
const event = async (req, res) => {
    const date = new Date(req.body.eventDate);
    const eventRecord = new Event({
        userURL : req.body.userURL,
        eventDuration : req.body.eventDuration,
        eventDate : date
    });
    try{
        const savedPost = await eventRecord.save();
        res.json(`Successfully created the event ${savedPost}`);
    }catch(err){
        res.json({message: err});
    }
    
};

module.exports = event;