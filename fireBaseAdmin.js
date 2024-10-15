const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json'); // Adjust path based on where you placed the file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;