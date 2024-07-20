// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY_FIREBASE,
  authDomain: import.meta.env.VITE_authDomain_FIREBASE,
  projectId:  import.meta.env.VITE_projectId_FIREBASE,
  storageBucket: import.meta.env.VITE_storageBucket_FIREBASE,
  messagingSenderId: import.meta.env.VITE_messagingSenderId_FIREBASE,
  appId: import.meta.env.VITE_appId_FIREBASE,
  measurementId: import.meta.env.VITE_measurementId_FIREBASE
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);