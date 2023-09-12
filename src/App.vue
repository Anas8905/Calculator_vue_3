<template>
    <div  :class="{hidden: !isLogIn}">
        <div class="bg-gray-200 flex justify-evenly  mt-2 mb-4 rounded">

            <!--This is Logo-->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 my-1 float-left mr-auto">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
            </svg>
            <h1 class="text-3xl mt-1 float-left mr-auto">Budget Buddy</h1>
        </div>

        <!--Form For Signing up-->
        <div :class="{hidden: isSignUp}"  >
            <form class="border-2 border-gray-300 mx-2" @submit.prevent="createUserAuth, writeUserData">
                <div class=" m-2 grid grid-row gap-2 ">
                    <label>Email :</label>
                    <input v-model="email"  class="inpt" type="text" placeholder="Enter your Email">
                    <label>Name :</label>
                    <input v-model="name" class="inpt" type="text" placeholder="First Name">
                    <label>Password :</label>
                    <input v-model="password" class="inpt" type="password" placeholder="Enter your Password">
                    <button @click="createUserAuth" class="rounded-sm p-1 mx-28  inline-block bg-green-400 text-white" type="submit">Sign Up</button>
                </div>
            </form>
            <p>Already Have An Account? <span class="text-blue-600" @click="toggleisSignIn" >Sign In</span></p>
        </div>
    
        <!--Form For Signing In-->
        <div :class="{hidden: isSignIn}" >
            <form class="border-2 border-gray-300 mx-2"  @submit.prevent="signInUserAuth">
                <div class=" m-2 grid grid-row gap-2 ">
                    <label>Email :</label>
                    <input v-model="email" class="inpt" type="text" placeholder="Enter your Email">
                    <label>Password :</label>
                    <input v-model="password" class="inpt" type="password" placeholder="Enter your Password">
                    <button class="rounded-sm p-1 mx-28  inline-block bg-green-400 text-white" type="submit">Sign In</button>
                </div>
            </form>
            <p>Create An Account <span  class="text-blue-600" @click="toggleisSignUp">Sign Up</span></p>
        </div>
    </div>
    <MainDashboard 
    :class="{hidden: isLogIn}"
    :accountUUID = "accountUUID"
    :headings = "headings"
    @signedOut = "handleSignOut"
    />
</template>

<script>
import MainDashboard from "./components/MainDashboard.vue";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import { ref, set, getDatabase, onValue } from "firebase/database";
import {v4 as uuidv4} from 'uuid';

export default {
    name: "App",
    
    components: { MainDashboard },

    data(){
        return {
            headings: {},
            accountUUID : uuidv4(),
            isSignUp : false,
            isSignIn : true,
            email: '',
            password: '',
            name:'',
            isLogIn: true,
        }
    },
    
    methods:{
        toggleisSignUp(){
            this.isSignUp = false
            this.isSignIn = true
        },

        toggleisSignIn(){
            this.isSignIn = false
            this.isSignUp = true
        },

        createUserAuth(){
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
            // Signed in 
            this.authStateCange(this.email, this.name)
            this.email = ''
            this.password = ''
            this.name = ''
            const user = userCredential.user;
            alert('Welcome Now Sign in')
            console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode)
                alert(errorMessage)
            });
        },

        signInUserAuth() {
            const auth = getAuth()
            signInWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
                // Signed in 
                this.email = ''
                this.password = ''
                this.isLogIn = !this.isLogIn
                const user = userCredential.user;
                this.updateHeadings(user.uid)
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage)
            });    
        },
        
        authStateCange(email, name){
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
            if (user) {
                this.toggleisSignIn()
                const uid = user.uid;
                this.writeUserData(uid, name, email)
                // ...
            } else {
                alert('error')
            }
            });
        },

        handleSignOut(){
            this.isLogIn = true
        },

        writeUserData(userId, name, email) {
            const db = getDatabase();
            set(ref(db, 'users/' + userId), {
                username: name,
                email: email,
                income_categories: {
                    Salary: 0,
                    Pension: 0,
                    Bonus: 0
                },
                expense_categories: {
                    Groceries: 0,
                    Transport: 0,
                    Housing: 0,
                    Education: 0
                },
                headings: { 
                    income: 0,
                    expense: 0,
                    total: 0
                }
            });
            set(ref(db, 'accounts/' + userId), {
                account : this.accountUUID
            });
            set(ref(db, 'wallets/' + this.accountUUID),{
                Card: 0,
                Cash: 0,
                Bank: 0
            })
            },

            updateHeadings(id) {
                const db = getDatabase()
                onValue(ref(db, `users/${id}/headings`), (snapshot) => {
                    const heading = snapshot.val()
                    this.headings = heading
                })
            }
        },
    }
</script>
