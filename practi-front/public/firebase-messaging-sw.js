importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

console.log('[firebase-messaging-sw.js] Initializing Firebase...');

// Initialize Firebase in the service worker
firebase.initializeApp({
    apiKey: "AIzaSyBDngnZcQ8XW_z6tl0f6pLwu0oFP3zyctw",
    authDomain: "practi-project.firebaseapp.com",
    projectId: "practi-project",
    storageBucket: "practi-project.appspot.com",
    messagingSenderId: "171796620914",
    appId: "1:171796620914:web:22ee3a62b49ee49f9a84eb",
    measurementId: "G-1EMC4PELFR"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message: ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // Show notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});

console.log('[firebase-messaging-sw.js] Firebase initialized and service worker ready.');
