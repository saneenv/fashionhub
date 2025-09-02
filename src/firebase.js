// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2LDLTUJw5sQYUnxhsYeTxtZrSjyMWuow",
  authDomain: "fashionhub-beee0.firebaseapp.com",
  projectId: "fashionhub-beee0",
  storageBucket: "fashionhub-beee0.firebasestorage.app",
  messagingSenderId: "247281415364",
  appId: "1:247281415364:web:5c9ddc475d6e6b7e030591",
  measurementId: "G-RDFCJYNZCF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
