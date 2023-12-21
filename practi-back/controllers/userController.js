const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

/**
 * Creates a new user based on the provided data.
 */
exports.createUser = async (req, res) => {
  try {
    const { fullName, cityOfLiving, age, username } = req.body;

    const user = await userService.createUser({
      fullName, cityOfLiving, age, username
    });

    res.status(200).send('User saved successfully');
  } catch (error) {
    res.status(500).send('Error saving user');
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
            const { fullName, cityOfLiving, age, username } = user;
            res.json({fullName, cityOfLiving, age, username });
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
    const { username} = req.body;
    console.log("token",username);
    // Find the user in the database
    const user = await userService.getUserByUsername(username);

    if (user) {
      // Check if the provided password matches the user's password
        // Generate a JWT token
        const token = jwt.sign({ username: user.username }, 'your-secret-key');
        console.log(token);
        // Return the token as the response
        res.json({ token });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
