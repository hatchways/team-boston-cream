const Event = require("../models/Event");

// @route POST /event/schedule
// @desc search for entries in the database and returns the schedules
// @access Private
const schedule = async (req, res) => {
    try{
        const schedule = await Event.find( {userURL : req.params.userURL} );
        const result = { 'schedule' : schedule};
        res.json(result);
    }catch(err){
        res.json({message: err});
    };
    
};

module.exports = schedule;