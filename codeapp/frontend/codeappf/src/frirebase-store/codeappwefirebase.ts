// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChrMtaLvobaTylGd11H6TTgPQUW6JrmrE",
  authDomain: "codeapp-dda5e.firebaseapp.com",
  projectId: "codeapp-dda5e",
  storageBucket: "codeapp-dda5e.appspot.com",
  messagingSenderId: "486093466244",
  appId: "1:486093466244:web:0c0b4c404fec2cace070d1",
  measurementId: "G-J57MWW12FG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);