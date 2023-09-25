import { createApp } from 'vue'
import { initializeApp } from "firebase/app"
import App from './App.vue'
import './assets/tailwind.css'
import store from '../src/store'

const firebaseConfig = {
    apiKey: "AIzaSyC9hvhfaUKGiXo5RqYsxxTnXBQoF9GxEM4",
    authDomain: "vue-bgt-bdy.firebaseapp.com",
    projectId: "vue-bgt-bdy",
    storageBucket: "vue-bgt-bdy.appspot.com",
    messagingSenderId: "731504804370",
    appId: "1:731504804370:web:a87cf3dfdc16f44339cecb",
    measurementId: "G-S7FNKL4HHM",
    databaseURL: "https://vue-bgt-bdy-default-rtdb.firebaseio.com",
}

initializeApp(firebaseConfig)
const app = createApp(App)
app.use(store).mount('#app');
