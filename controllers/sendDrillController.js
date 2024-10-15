const sendDrillService = require('../services/sendDrillService');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const Users = require('../models/user'); // Assuming Users is your user model
const admin = require('./firebaseAdmin');

/**
 * Adds a new drill assignment based on the provided data in the request body.
 * The function extracts the drill ID from the request parameters and the coach's username from the JWT token.
 * If the drill is successfully added, it returns the drill data with a 200 status code.
 * If the drill cannot be added, it returns a 401 status code with an error message.
 * In case of any error, it logs the error and returns a 500 status code.
 */
exports.addDrill = async (req, res) => {
  try {
    const { drillName, topic, user } = req.body;
    const { drillId } = req.params;

    // Extract and parse the token from the Authorization header
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;

    // Decode the JWT token to get the coach's username
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const coach = decoded.username;

    // Add the drill using the service layer
    const addDrill = await sendDrillService.addDrill(drillId, user, coach, drillName, topic);

    if (addDrill) {
      // Fetch the user details to get the FCM token
      const userRecord = await Users.findOne({ username: user });
      
      if (userRecord && userRecord.fcmToken) {
        // Define the notification message in Hebrew
        const message = {
          notification: {
            title: 'המאמן שלח לך אימון חדש',
            body: `אימון חדש: ${drillName}`, // Including the drillName in the body
          },
          token: userRecord.fcmToken, // Send to the user's FCM token
        };

        // Try to send the notification, but don't throw an error if it fails
        admin.messaging().send(message)
          .then((response) => {
            console.log('Successfully sent notification:', response);
          })
          .catch((error) => {
            console.warn('Failed to send notification, but continuing:', error);
          });
      }

      // Send the response regardless of whether the notification was sent successfully
      res.status(200).json(addDrill);
    } else {
      res.status(401).json({ error: 'Cannot add drill' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Deletes a drill assignment based on the drill ID provided in the request parameters.
 * If the drill is successfully deleted, it returns a 200 status code with a success message.
 * If the drill is not found, it returns a 404 status code with an error message.
 * In case of any error, it logs the error and returns a 500 status code.
 */
exports.deleteDrill = async (req, res) => {
  try {
    const { drillId } = req.params;

    // Delete the drill using the service layer
    const success = await sendDrillService.deleteDrill(drillId);
    if (success) {
      res.status(200).json({ message: 'Drill deleted successfully' });
    } else {
      res.status(404).json({ error: 'Drill not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Retrieves all drills assigned to the authenticated user.
 * The function extracts the user's username from the JWT token.
 * If successful, it returns the list of drills with a 200 status code.
 * In case of any error, it logs the error and returns a 500 status code.
 */
exports.getDrillsByUser = async (req, res) => {
  try {
    // Extract and parse the token from the Authorization header
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;

    // Decode the JWT token to get the user's username
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const username = decoded.username;

    // Retrieve the drills for the user using the service layer
    const drills = await sendDrillService.getDrillsByUser(username);
    res.status(200).json(drills);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Retrieves all drills assigned by the authenticated coach.
 * The function extracts the coach's username from the JWT token.
 * If successful, it returns the list of drills with a 200 status code.
 * In case of any error, it logs the error and returns a 500 status code.
 */
exports.getDrillsByCoach = async (req, res) => {
  try {
    // Extract and parse the token from the Authorization header
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token);
    const tokenValue = parsedToken.token;

    // Decode the JWT token to get the coach's username
    const decoded = await promisify(jwt.verify)(tokenValue, 'your-secret-key');
    const username = decoded.username;

    // Retrieve the drills assigned by the coach using the service layer
    const drills = await sendDrillService.getDrillsByCoach(username);
    res.status(200).json(drills);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
