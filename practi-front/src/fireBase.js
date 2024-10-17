// firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'BPVVffu9hkSGUvIQ2j12xoaVcAHc9C4da3ybDGpha0HPKMoT6q_tjITl-ekDBfL387vXZqxEzbbFuGi9MIZcAvg',
  authDomain: 'practi-project.firebaseapp.com',
  projectId: 'practi-project',
  storageBucket: 'practi-project.appspot.com',
  messagingSenderId: '171796620914',
  appId: '1:171796620914:web:22ee3a62b49ee49f9a84eb',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(function(registration) {
      console.log('[firebase.js] Service worker registered successfully: ', registration);
      messaging.useServiceWorker(registration);
    })
    .catch(function(err) {
      console.error('[firebase.js] Service worker registration failed: ', err);
    });
}

export { messaging };
