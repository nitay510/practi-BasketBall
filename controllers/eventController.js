const eventService = require('../services/eventService');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

/**
 * Adds a new event based on the provided data.
 * This function extracts the event details from the request body and the username from the authorization token.
 * The event is then added using the eventService. If successful, a 200 status code is returned; otherwise, an error is logged and a 500 status is returned.
 */
exports.addEvent = async (req, res) => {
  try {
    const { teamName, type, eventName, date, startTime, duration, tasks } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;

    // Decode the token to extract the username
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const username = decoded.username;

    // Prepare the event data
    const eventData = {
      username,
      teamName,
      type,
      eventName,
      date,
      startTime,
      duration,
      tasks,
    };

    // Add the event using the event service
    await eventService.addEvent(eventData);
    res.status(200).send('Event added successfully');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Gets all upcoming events for the authenticated user.
 * This function extracts the username from the authorization token and retrieves upcoming events using the eventService.
 * If successful, the events are returned as JSON; otherwise, an error is logged and a 500 status is returned.
 */
exports.getUpcomingEvents = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;

    // Decode the token to extract the username
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const username = decoded.username;

    // Fetch upcoming events using the event service
    const events = await eventService.getUpcomingEvents(username);
    res.json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Gets events within a specific date range for the authenticated user.
 * This function retrieves events that fall within the specified start and end dates.
 * If the date range is valid, the events are fetched using the eventService and returned as JSON; otherwise, an error is logged and a 500 status is returned.
 */
exports.getEventsByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;
  const token = req.headers.authorization.split(' ')[1];
  const parsedToken = JSON.parse(token);
  const tokenValue = parsedToken.token;

  try {
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const username = decoded.username;

    // Validate that both start and end dates are provided
    if (!startDate || !endDate) {
      return res.status(400).send({ error: 'Start date and end date are required.' });
    }

    // Fetch events within the specified date range
    const events = await eventService.getEventsByDateRange(username, startDate, endDate);
    res.json(events);
  } catch (error) {
    console.error('Error fetching events by date range:', error);
    res.status(500).send({ error: 'Failed to fetch events' });
  }
};

/**
 * Gets a specific event by its ID.
 * This function retrieves an event based on the provided event ID.
 * If successful, the event is returned as JSON; otherwise, an error is logged and a 500 status is returned.
 */
exports.getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the event by ID using the event service
    const event = await eventService.getEventById(id);
    res.json(event);
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    res.status(500).send({ error: 'Failed to fetch event' });
  }
};

/**
 * Updates an existing event based on the provided data.
 * This function extracts the event details and ID from the request, updates the event using the eventService,
 * and returns a success message if the update is successful; otherwise, an error is logged and a 500 status is returned.
 */
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { teamName, type, eventName, date, startTime, duration, tasks } = req.body;
  const token = req.headers.authorization.split(' ')[1];
  const parsedToken = JSON.parse(token);
  const tokenValue = parsedToken.token;

  try {
    // Decode the token to extract the username
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const username = decoded.username;

    // Prepare the updated event data
    const eventData = {
      username,
      teamName,
      type,
      eventName,
      date,
      startTime,
      duration,
      tasks,
    };
    // Update the event using the event service
    await eventService.updateEvent(id, eventData);
    res.status(200).send('Event updated successfully');
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).send({ error: 'Failed to update event' });
  }
};

/**
 * Deletes an event by its ID.
 * This function deletes an event based on the provided event ID.
 * If successful, a success message is returned; otherwise, an error is logged and a 500 status is returned.
 */
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    // Delete the event by ID using the event service
    await eventService.deleteEvent(id);
    res.status(200).send('Event deleted successfully');
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).send({ error: 'Failed to delete event' });
  }
};
