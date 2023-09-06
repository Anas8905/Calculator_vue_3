import { createApp } from 'vue'
import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC9hvhfaUKGiXo5RqYsxxTnXBQoF9GxEM4",
    authDomain: "vue-bgt-bdy.firebaseapp.com",
    projectId: "vue-bgt-bdy",
    storageBucket: "vue-bgt-bdy.appspot.com",
    messagingSenderId: "731504804370",
    appId: "1:731504804370:web:a87cf3dfdc16f44339cecb",
    measurementId: "G-S7FNKL4HHM",
    databaseURL: "https://vue-bgt-bdy-default-rtdb.firebaseio.com",
};
const app = initializeApp(firebaseConfig);

import App from './App.vue'
import './assets/tailwind.css'
import { getAuth } from 'firebase/auth';
getAuth(app)
createApp(App).mount('#app')

// Initialize Realtime Database and get a reference to the service
// const db = getDatabase(app);