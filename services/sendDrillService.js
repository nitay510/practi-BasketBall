const SendDrill = require('../models/sendDrill');
const Users = require('../models/user');
const moment = require('moment');

/**
 * Adds a new drill for a specific user and coach.
 * This function checks if both the user and coach exist, then creates a new drill assignment with the current date.
 * @param {string} drillId - The ID of the drill.
 * @param {string} user - The username of the player receiving the drill.
 * @param {string} coach - The username of the coach assigning the drill.
 * @param {string} drillName - The name of the drill.
 * @param {string} topic - The topic or category of the drill.
 * @returns {Object|null} The newly created drill document or null if the user or coach is not found.
 */
exports.addDrill = async (drillId, user, coach, drillName, topic) => {
    try {
        // Find the user and coach in the database
        const userToFind = await Users.findOne({ username: user });
        const coachToFind = await Users.findOne({ username: coach });

        if (!userToFind || !coachToFind) {
            return null; // Return null if either the user or coach is not found
        }

        const currentDate = new Date(); // Get the current date

        // Create a new drill assignment
        const drill = new SendDrill({
            drillId: drillId,
            date: currentDate,
            userPlayer: userToFind.username,
            userCoach: coachToFind.username,
            drillName: drillName,
            topic: topic,
        });

        await drill.save(); // Save the drill assignment to the database
        return drill; // Return the saved drill assignment
    } catch (error) {
        throw error; // Throw an error if something goes wrong
    }
};

/**
 * Deletes a drill by its ID.
 * This function removes a drill assignment from the database based on the provided drill ID.
 * @param {string} drillId - The ID of the drill to be deleted.
 * @returns {boolean} True if the drill was successfully deleted, otherwise false.
 */
exports.deleteDrill = async (drillId) => {
    try {
        const result = await SendDrill.deleteOne({ drillId });
        return result.deletedCount > 0; // Return true if a drill was deleted, otherwise false
    } catch (error) {
        throw error; // Throw an error if something goes wrong
    }
};

/**
 * Retrieves all drills assigned to a user within the last two weeks.
 * This function fetches drill assignments for a specific user from the last two weeks.
 * @param {string} username - The username of the player.
 * @returns {Array} An array of drills assigned to the user.
 */
exports.getDrillsByUser = async (username) => {
    try {
        const twoWeeksAgo = moment().subtract(2, 'weeks').toDate(); // Calculate the date two weeks ago
        const drills = await SendDrill.find({
            userPlayer: username,
            date: { $gte: twoWeeksAgo } // Filter drills assigned in the last two weeks
        });
        return drills; // Return the list of drills
    } catch (error) {
        throw error; // Throw an error if something goes wrong
    }
};

/**
 * Retrieves all drills assigned by a specific coach.
 * This function fetches all drill assignments that a coach has assigned.
 * @param {string} username - The username of the coach.
 * @returns {Array} An array of drills assigned by the coach.
 */
exports.getDrillsByCoach = async (username) => {
    try {
        const drills = await SendDrill.find({ userCoach: username });
        return drills; // Return the list of drills assigned by the coach
    } catch (error) {
        throw error; // Throw an error if something goes wrong
    }
};
