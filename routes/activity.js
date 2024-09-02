const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

// Route to track user login
router.post('/activity/login', activityController.trackLogin);

// Route to get user activity data by username
router.get('/activity/:username', activityController.getUserActivity);

module.exports = router;
