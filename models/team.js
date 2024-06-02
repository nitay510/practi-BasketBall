// teamModel.js

const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  club: {
    type: String,
    required: false,
  },
  coach: {
    type: String,
    required: true,
  },
  players: [{
    type: String,
    required: false,
  }],
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
