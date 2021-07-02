const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  userURL: {
    type: String,
    required: true,
  },
  eventDuration: {
    type: Number,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  eventLink:{
    type:String,
    required: true
  },
  eventStatus: {
    type: Boolean,
    default: false
  }
});


module.exports = Event = mongoose.model("event", eventSchema);
