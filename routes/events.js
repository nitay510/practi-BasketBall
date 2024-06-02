// eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/events', eventController.addEvent);
// router.get('/events/:year/:week', eventController.getEventsForWeek);
router.get('/events/id/:id', eventController.getEventById);
router.get('/events', eventController.getUpcomingEvents);
router.get('/events/date-range', eventController.getEventsByDateRange);
router.post('/events/:id', eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);

// Define other routes similarly
module.exports = router;
