const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const bcrypt = require('bcrypt');

/**
 * Creates a new user based on the provided data.
 */
exports.createUser = async (req, res) => {
  try {
    const { fullName, username,password,isCoach,clubName } = req.body;
    const user = await userService.createUser({
      fullName, username,password,isCoach,clubName
    });

    res.status(200).send('User saved successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error saving user');
  }
};

/**
 * Updates the FCM token for a specific user.
 */
exports.updateFcmToken = async (req, res) => {
  try {
    const { username, fcmToken } = req.body;

    // Update the user's FCM token
    const user = await userService.updateFcmToken(username, fcmToken);

    if (user) {
      res.status(200).send('FCM token updated successfully');
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating FCM token:', error);
    res.status(500).send('Error updating FCM token');
  }
};

/**
 * Gets user information by username, with token verification.
 */
exports.getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const token = req.headers.authorization.split(' ')[1]; // Extract the token from the "Authorization" header
    const parsedToken = JSON.parse(token); // Parse the token string as JSON
    const tokenValue = parsedToken.token; // Access the value of the "token" key

    const user = await userService.getUserByUsername(username);

    if (user) {
      // Verify the token
      jwt.verify(tokenValue, 'your-secret-key', (err, decoded) => {
        if (err) {
          // Token is invalid or expired
          res.status(401).json({ error: 'Invalid token' });
        } else {
          // Token is valid
          if (username === decoded.username) {
            const { fullName,isCoach,club } = user;
            res.json({fullName, isCoach,club });
          } else {
            res.status(401).json({ error: 'Invalid token' });
          }
        }
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Authenticates the user based on the provided username and password.
 */
exports.authenticateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find the user in the database
    const user = await userService.getUserByUsername(username);

    if (user) {
      // Check if the provided password matches the user's hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Generate a JWT token
        const token = jwt.sign({ username: user.username }, 'your-secret-key');
        // Return the token as the response
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid password' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
