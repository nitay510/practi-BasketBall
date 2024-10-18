// firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';

console.log('Firebase API Key:', process.env.REACT_APP_FIREBASE_API_KEY);
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "practi-project.firebaseapp.com",
    projectId: "practi-project",
    storageBucket: "practi-project.appspot.com",
    messagingSenderId: "171796620914",
    appId: "1:171796620914:web:22ee3a62b49ee49f9a84eb",
    measurementId: "G-1EMC4PELFR"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);
// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('[firebase.js] Service worker registered successfully:', registration);
      // No need for messaging.useServiceWorker() in Firebase v9
    })
    .catch((err) => {
      console.error('[firebase.js] Service worker registration failed:', err);
    });
}

// Handle foreground messages
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // Customize notification handling
});

export { messaging };
