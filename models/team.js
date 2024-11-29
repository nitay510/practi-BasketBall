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

// Create a unique compound index for teamName and club
teamSchema.index({ teamName: 1, club: 1 }, { unique: true });

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
