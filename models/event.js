const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    teamName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['game', 'practice'],
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String, // Storing time as string (HH:MM format)
        required: true
    },
    duration: {
        type: Number, // Duration in minutes
        required: true,
        default: 120

    },
    tasks: [{
        type: String // Array of tasks as strings
    }]
  
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
