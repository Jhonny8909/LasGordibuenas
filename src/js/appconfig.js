// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"

const firebaseConfig = {
  apiKey: "AIzaSyAdcRZ1cXao2H2tcw38Ro7EfMdvV_YQ_7s",
  authDomain: "las-gordibuenas-ddac4.firebaseapp.com",
  projectId: "las-gordibuenas-ddac4",
  storageBucket: "las-gordibuenas-ddac4.firebasestorage.app",
  messagingSenderId: "217143059770",
  appId: "1:217143059770:web:ec981fc237558afb1c1c03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);