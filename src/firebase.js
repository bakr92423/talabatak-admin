import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBLYy3BoIwYZmZl5QNv2vQAEEVRmtiuN94",
  authDomain: "talabatak-e5e44.firebaseapp.com",
  projectId: "talabatak-e5e44",
  storageBucket: "talabatak-e5e44.firebasestorage.app",
  messagingSenderId: "504703406209",
  appId: "1:504703406209:web:ecc844959eabe578877d80",
  measurementId: "G-DZ7QBYLRPP"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const VAPID_KEY = "BJZg_MZqr5NHHoro80kWdHlGZD5FrnCZb-sPcObckIhKhEGSwlE5AcM6S3DzV779elvA0_qaeoaNeaWJwbsqv9k";

export async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    console.log("FCM Token:", token);
    return token;
  } catch (e) {
    console.log("FCM Error:", e);
    return null;
  }
}

export function listenForOrders(callback) {
  onMessage(messaging, (payload) => {
    console.log("New order:", payload);
    callback(payload);
  });
}
