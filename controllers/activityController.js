const Activity = require('../models/activity');

const activityController = {
  // Track user login
  async trackLogin(req, res) {
    const { username } = req.body;

    try {
      let activity = await Activity.findOne({ username });

      if (activity) {
        activity.loginCount += 1;
        activity.lastLogin = new Date();
      } else {
        activity = new Activity({
          username,
          loginCount: 1,
          lastLogin: new Date(),
        });
      }

      await activity.save();
      res.status(200).json({ message: 'Login tracked successfully', activity });
    } catch (error) {
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
