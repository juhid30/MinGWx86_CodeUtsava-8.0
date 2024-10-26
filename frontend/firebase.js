// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfEMLR9HIwLe7E25Do5Jy1VwlW4_zCFuc",
  authDomain: "codeutsava-45dda.firebaseapp.com",
  projectId: "codeutsava-45dda",
  storageBucket: "codeutsava-45dda.appspot.com",
  messagingSenderId: "125053951590",
  appId: "1:125053951590:web:f00bbb580ca546b16057a7",
  measurementId: "G-38Z99K1GNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
