const mongoose = require('mongoose');
const Activity = require('../models/activity');

const activityController = {
  // Track user login
  async trackLogin(req, res) {
    const { username } = req.body;

    try {
      // Use findOneAndUpdate to update the existing activity or create a new one if it doesn't exist
      const activity = await Activity.findOneAndUpdate(
        { username }, 
        {
          $inc: { loginCount: 1 },  // Increment loginCount by 1
          lastLogin: new Date(),    // Update the lastLogin field
        },
        { new: true, upsert: true } // Return the modified document and create if it doesn't exist
      );

      res.status(200).json({ message: 'Login tracked successfully', activity });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get user activity by username
  async getUserActivity(req, res) {
    const { username } = req.params;

    try {
      const activity = await Activity.findOne({ username });
      if (!activity) {
        return res.status(404).json({ error: 'Activity not found for this user' });
      }
      res.status(200).json(activity);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = activityController;
