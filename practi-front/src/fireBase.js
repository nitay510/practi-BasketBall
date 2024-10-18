// firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBDngnZcQ8XW_z6tl0f6pLwu0oFP3zyctw",
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
    })
    .catch((err) => {
      console.error('[firebase.js] Service worker registration failed:', err);
    });
}

// Handle foreground messages
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);

  if (Notification.permission === 'granted') {
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: payload.data.icon,
      data: { url: payload.data.click_action },
    };

    const notification = new Notification(notificationTitle, notificationOptions);

    // Handle notification click
    notification.onclick = (event) => {
      event.preventDefault();
      window.open(notificationOptions.data.url, '_blank');
      notification.close();
    };
  } else {
    console.log('Notification permission not granted.');
  }
});

export { messaging };