const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name:{
      type: String,
      required: true,
      trim: true
    },
    description:{
      type: String,
      required: true
    },
    time:{
      type: String,
      required: true
    },
    date:{
      type: String,
      required: true
    },
    end_date:{
      type:String,
      required:true
    },
    venue:{
      type: String,
      required: true
    }
});

const Event = mongoose.model('Event',eventSchema);
module.exports = Event;
