// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "las-gordibuenas-ddac4.firebaseapp.com",
  projectId: "las-gordibuenas-ddac4",
  storageBucket: "las-gordibuenas-ddac4.firebasestorage.app",
  messagingSenderId: "217143059770",
  appId: "1:217143059770:web:ec981fc237558afb1c1c03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);