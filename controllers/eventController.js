const eventService = require('../services/eventService');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

/**
 * Adds a new event based on the provided data.
 */
exports.addEvent = async (req, res) => {
  try {
    const { teamName, type, eventName, date, startTime, duration, tasks } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const username = decoded.username;



    const eventData = {
      username,
      teamName,
      type,
      eventName,
      date,
      startTime,
      duration,
      tasks
    };

    const addedEvent = await eventService.addEvent(eventData);
    res.status(200).send('Event added successfully');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Gets events for a specific week for the authenticated user.
 */
// exports.getEventsForWeek = async (req, res) => {
//   try {
//     const { year, week } = req.params;
//     const token = req.headers.authorization.split(' ')[1];
//     const parsedToken = JSON.parse(token);
//     const tokenValue = parsedToken.token;
//     const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
//     const username = decoded.username;

//     const events = await eventService.getEventsForWeek(username, year, week);
//     res.json(events);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

/**
 * Gets all upcoming events for the authenticated user.
 */
exports.getUpcomingEvents = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const username = decoded.username;
    const events = await eventService.getUpcomingEvents(username);
    res.json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getEventsByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;
  const token = req.headers.authorization.split(' ')[1];
  const parsedToken = JSON.parse(token);
  const tokenValue = parsedToken.token;
  
  try {
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const username = decoded.username;

    if (!startDate || !endDate) {
      return res.status(400).send({ error: "Start date and end date are required." });
    }

    const events = await eventService.getEventsByDateRange(username, startDate, endDate);
    res.json(events);
  } catch (error) {
    console.error("Error fetching events by date range:", error);
    res.status(500).send({ error: "Failed to fetch events" });
  }
}

exports.getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await eventService.getEventById(id);
    res.json(event);
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    res.status(500).send({ error: "Failed to fetch event" });
  }
};

exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { teamName, type, eventName, date, startTime, duration, tasks } = req.body;
  const token = req.headers.authorization.split(' ')[1];
  const parsedToken = JSON.parse(token);
  const tokenValue = parsedToken.token;
  const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
  const username = decoded.username;

  try {
    const eventData = {
      username,
      teamName,
      type,
      eventName,
      date,
      startTime,
      duration,
      tasks
    };
    console.log('eventData:', eventData);
    const updatedEvent = await eventService.updateEvent(id, eventData);
    res.status(200).send('Event updated successfully');
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).send({ error: "Failed to update event" });
  }
}

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await eventService.deleteEvent(id);
    res.status(200).send('Event deleted successfully');
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).send({ error: "Failed to delete event" });
  }
}
// Implement other necessary endpoints similarly
