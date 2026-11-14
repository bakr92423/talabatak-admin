importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBLYy3BoIwYZmZl5QNv2vQAEEVRmtiuN94",
  authDomain: "talabatak-e5e44.firebaseapp.com",
  projectId: "talabatak-e5e44",
  storageBucket: "talabatak-e5e44.firebasestorage.app",
  messagingSenderId: "504703406209",
  appId: "1:504703406209:web:ecc844959eabe578877d80",
  measurementId: "G-DZ7QBYLRPP"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "طلب جديد!";
  const options = {
    body: payload.notification?.body || "وصلك طلب جديد",
    icon: "/logo.png",
    sound: "/notification.mp3",
    vibrate: [200, 100, 200],
  };
  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});
