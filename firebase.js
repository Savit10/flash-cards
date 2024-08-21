// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnTVNHmRGC3W1b0cGlCsgy4Fn6Eoi8vdQ",
  authDomain: "flash-cards-32424.firebaseapp.com",
  projectId: "flash-cards-32424",
  storageBucket: "flash-cards-32424.appspot.com",
  messagingSenderId: "600819536134",
  appId: "1:600819536134:web:bf004a51574ce0590b8e87",
  measurementId: "G-LZ1GCLN8GV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;