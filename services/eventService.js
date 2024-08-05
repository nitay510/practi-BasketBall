const Event = require('../models/event'); // Import your Event model

/**
 * Adds a new event to the database.
 * @param {Object} eventData - Data for the new event.
 * @returns {Promise<Event>} - Returns the created Event object.
 */
exports.addEvent = async (eventData) => {
  const newEvent = new Event(eventData);
  try {
    await newEvent.save();
    return newEvent;
  } catch (error) {
    throw error;
  }
};

/**
 * Gets events for a specific week for a given user.
 * @param {string} username - Username of the user.
 * @param {number} year - Year to filter the events.
 * @param {number} week - Week number to filter the events.
 * @returns {Promise<Event[]>} - Returns an array of Event objects.
 */
exports.getEventsForWeek = async (username, year, week) => {
  const startDate = getStartDateOfWeek(year, week);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6); // Add 6 days to start date to get the end date of the week

  try {
    return await Event.find({
      username: username,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 });
  } catch (error) {
    throw error;
  }
};

/**
 * Gets all upcoming events for a specific user.
 * @param {string} username - Username of the user.
 * @returns {Promise<Event[]>} - Returns an array of upcoming Event objects.
 */
exports.getUpcomingEvents = async (username) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 30);
  try {
    return await Event.find({
      username: username,
      date: { $gte: currentDate }
    }).sort({ date: 1 });
  } catch (error) {
    throw error;
  }
};

/**
 * Helper function to calculate the start date of a given week and year.
 * @param {number} year - Year of the week.
 * @param {number} week - Week number.
 * @returns {Date} - Returns the start date of the week.
 */
function getStartDateOfWeek(year, week) {
  const janFirst = new Date(year, 0, 1);
  const days = (week - 1) * 7 - janFirst.getDay() + 1;
  return new Date(year, 0, days);
}

exports.getEventsByDateRange = async (username, startDate, endDate) => {
  try {
    const events = await Event.find({
      username: username,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) }
    });
    return events;
  } catch (error) {
    throw error;
  }
}

exports.getEventById = async (id) => {
  try {
    return await Event.findById(id);
  } catch (error) {
    throw error;
  }
};

exports.updateEvent = async (id, eventData) => {
  try {
    return await Event.findByIdAndUpdate
      (id, eventData, { new: true });
  }
  catch (error) {
    throw error;
  }
};

exports.deleteEvent = async (id) => {
  try {
    return await Event.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};