const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Path to your Firebase service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;