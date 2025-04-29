import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVpo0JWG6_03v6zmqycQ6eXlwR01P5rXA",
  authDomain: "vip-home-tutors.firebaseapp.com",
  projectId: "vip-home-tutors",
  storageBucket: "vip-home-tutors.appspot.com",
  messagingSenderId: "989662773201",
  appId: "1:989662773201:web:9db8e4ba9c545da9932af0",
  measurementId: "G-PS4GK783MX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Firestore
const auth = getAuth(app); // Initialize Firebase Auth
const db = getFirestore(app); // Initialize Firestore

// Export necessary Firebase services
export { db, auth, RecaptchaVerifier, signInWithPhoneNumber };
