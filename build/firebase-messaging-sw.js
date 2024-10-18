//firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js');

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

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message: ', payload);

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
    data: { url: payload.data.click_action },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', function (event) {
  console.log('[firebase-messaging-sw.js] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      for (const client of clientList) {
        if (client.url === event.notification.data.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});

console.log('[firebase-messaging-sw.js] Firebase initialized and service worker ready.');
