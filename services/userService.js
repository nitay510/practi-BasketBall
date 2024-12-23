const Users = require('../models/user');
const bcrypt = require('bcrypt');
/**
 * Creates a new user in the database.
 * @param {Object} userData - User data including firstName, lastName, cityOfLiving, age, username, and password.
 * @returns {Promise<User>} - Returns the created User object.
 */
exports.createUser = async (userData) => {
  try {
    const { fullName, username, isCoach, password, clubName } = userData;

    // Check if the username already exists
    const existingUser = await Users.findOne({ username });
    if (existingUser) {
      throw new Error('Username already exists. Please choose a different username.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User document
    const user = new Users({
      fullName,
      club: clubName,
      username,
      isCoach,
      password: hashedPassword, // Save the hashed password
    });

    // Save the user document to the database
    await user.save();

    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
/**
 * Updates the FCM token for the user.
 * @param {string} username - The username of the user.
 * @param {string} fcmToken - The FCM token to be saved.
 * @returns {Promise<User|null>} - Returns the updated user or null if not found.
 */
exports.updateFcmToken = async (username, fcmToken) => {
  try {
    const user = await Users.findOneAndUpdate(
      { username },
      { fcmToken }, // Update the user's FCM token
      { new: true } // Return the updated document
    );
    return user;
  } catch (error) {
    console.error('Error updating FCM token:', error);
    throw error;
  }
};
/**
 * Gets a user from the database based on the provided username.
 * @param {string} username - Username of the user.
 * @returns {Promise<User|null>} - Returns the user object or null if not found.
 */
exports.getUserByUsername = async (username) => {
  try {
    // Assuming you have a User model defined with the required schema
    const user = await Users.findOne({ username });
    return user;
  } catch (error) {
    throw error;
  }
};
/**
 * Fetches multiple users by their usernames.
 * @param {string[]} usernames - Array of usernames.
 * @returns {Promise<User[]>} - Array of user objects.
 */
exports.getUsersByUsernames = async (usernames) => {
  try {
    const users = await Users.find({ username: { $in: usernames } });
    return users;
  } catch (error) {
    console.error('Error fetching users by usernames:', error);
    throw error;
  }
};