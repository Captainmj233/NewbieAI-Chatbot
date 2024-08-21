import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDGax8T-2dVYvxWTayyF-xoHVeGDGd3ni8",
    authDomain: "auyth-c1651.firebaseapp.com",
    projectId: "auyth-c1651",
    storageBucket: "auyth-c1651.appspot.com",
    messagingSenderId: "220135910863",
    appId: "1:220135910863:web:d9a4652dc3493ffbf9f6ba",
    measurementId: "G-6YR39FBX56"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth}