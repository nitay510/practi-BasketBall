const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  username: { type: String, ref: 'User', required: true },
  loginCount: { type: Number, default: 0 },
  lastLogin: Date,
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
