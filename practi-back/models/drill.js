const mongoose = require('mongoose')

const drillSchema = new mongoose.Schema({
    drillNumber: {
        type: Number,
        required: true
      },
    drillId: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true
      },
      missionName:{
        type: String,
        required: true,
      },
      tries:{
        type:Number,
        required: false,
      },
      successes: {
        type: Number,
        required: true,
      },
  user: {
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
   isSingle: {
    type: Boolean,
    required: true,
  },
  opponentScore: {
    type: Number,
    required: false,
  },
  opponentName: {
    type: String,
    required: false,
  },
  target: {
    type:Number,
    required:false,
  },
})

const Drill = mongoose.model('Drills', drillSchema)

module.exports = Drill