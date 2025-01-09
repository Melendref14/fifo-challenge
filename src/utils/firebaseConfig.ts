// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFVCT1sQ9cRXAmHXFE6aLwXfh_KGK6ZG8",
  authDomain: "fifo-challenge-812fa.firebaseapp.com",
  projectId: "fifo-challenge-812fa",
  storageBucket: "fifo-challenge-812fa.firebasestorage.app",
  messagingSenderId: "1089766072558",
  appId: "1:1089766072558:web:ebe3c25c21cb5ee06193ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {auth, db, app};
