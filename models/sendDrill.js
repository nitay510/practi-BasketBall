const mongoose = require('mongoose')

const sendDrillSchema = new mongoose.Schema({
    drillId: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true
      },
  userPlayer: {
    type: String,
    required: true,
  },
  userCoach: {
    type: String,
    required: true,
  },
  drillName: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
})

const SendDrill = mongoose.model('SendDrills', sendDrillSchema)

module.exports = SendDrill