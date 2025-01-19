// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-Otbw8Io3BIp8x90Gl-im1ve5m4oFdlE",
  authDomain: "react-tube-01.firebaseapp.com",
  projectId: "react-tube-01",
  storageBucket: "react-tube-01.appspot.com",
  messagingSenderId: "1017999452357",
  appId: "1:1017999452357:web:4cd877b157dbda20aa68ac",
  databaseURL: "https://react-tube-01-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);