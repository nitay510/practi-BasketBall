importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging.js');

// Initialize Firebase in the service worker
console.log('[firebase-messaging-sw.js] Starting Firebase initialization...');
firebase.initializeApp({
  apiKey: 'BPVVffu9hkSGUvIQ2j12xoaVcAHc9C4da3ybDGpha0HPKMoT6q_tjITl-ekDBfL387vXZqxEzbbFuGi9MIZcAvg',
  authDomain: 'practi-project.firebaseapp.com',
  projectId: 'practi-project',
  storageBucket: 'practi-project.appspot.com',
  messagingSenderId: '171796620914',
  appId: '1:171796620914:web:22ee3a62b49ee49f9a84eb',
});

const messaging = firebase.messaging();
console.log('[firebase-messaging-sw.js] Firebase initialized successfully.');

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message: ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  
  console.log('[firebase-messaging-sw.js] Displaying notification: ', notificationTitle, notificationOptions);
  self.registration.showNotification(notificationTitle, notificationOptions);
});

console.log('[firebase-messaging-sw.js] Service worker setup complete.');
