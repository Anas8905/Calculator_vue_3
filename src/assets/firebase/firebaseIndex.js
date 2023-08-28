// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC9hvhfaUKGiXo5RqYsxxTnXBQoF9GxEM4",
    authDomain: "vue-bgt-bdy.firebaseapp.com",
    projectId: "vue-bgt-bdy",
    storageBucket: "vue-bgt-bdy.appspot.com",
    messagingSenderId: "731504804370",
    appId: "1:731504804370:web:a87cf3dfdc16f44339cecb",
    measurementId: "G-S7FNKL4HHM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);