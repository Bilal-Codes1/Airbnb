import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCM2mgVvh0LVchfr4ZeY-i3rvNdJmzIlo",
  authDomain: "travel-booking-6f58b.firebaseapp.com",
  projectId: "travel-booking-6f58b",
  storageBucket: "travel-booking-6f58b.appspot.com",
  messagingSenderId: "911639613220",
  appId: "1:911639613220:web:3cb080892d084a413eedb1",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, db, auth };
