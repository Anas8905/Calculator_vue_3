<template>
    <div>

        <!--List Of Income Categories-->
        <button @click="showIncomeCategories" type="button" class="ml-2 my-2 text-base font-semibold">Select Income Category:</button>
        <div class="ml-2 grid grid-rows gap-0">
            <label v-for="(item, index) in incomeCategories" :key="index" :for="'category_' + index">
                <input v-model="category" :value="item" :id="'category_' + index" type="radio">
                {{ item }}
            </label>
        </div>

        <!-- Wallet Types-->
        <button @click="showWalletCategories" type="button" class="ml-2 my-2 text-base font-semibold">Select Wallet Type:</button>
        <div class="ml-2 grid grid-cols-4  gap-0">
            <label v-for="(item, index) in walletTypes" :key="index" :for="'category' + index"> 
                <input v-model="wallet" :value="item" :id="'category' + index" type="radio">
                {{ item }}
            </label>
        </div>

        <!--Let user write Descriptions-->
        <div>
            <h2 class="ml-2 text-base font-semibold">Any Description?</h2>
            <input v-model="description" class="border-4 border-gray-300 m-1" type="text">
        </div>

        <!--Add transaction to Darabase-->
        <div>
            <h2 class="ml-2 text-base font-semibold">Enter Amount:</h2>
            <input @keyup.enter="addTransaction" v-model="amount" class="border-4 border-gray-300 m-1" type="text">
            <button class="bg-gray-400 text-white border-2 border-gray-300 rounded-lg px-1 pb-0" @click="addTransaction">
                Add
            </button>
        </div>
    </div>
</template>

<script>
import {v4 as uuidv4} from 'uuid';
import { getAuth } from "firebase/auth"
import { ref, set, getDatabase, onValue } from "firebase/database";
export default {
    name: 'IncomeCategories',
    data() {
        return {
            incomeCategories: [],
            walletTypes: [],
            amount: '',
            wallet: '',
            category: '',
            description: ''
        }
    },

    methods: {
        addTransaction(){
            const auth = getAuth()
            const user = auth.currentUser
            const db = getDatabase()
            const date = new Date()
            const year = date.getFullYear();
            const month = date.getMonth() + 1
            const day = date.getDate()
            const myuuid = uuidv4()
            const transactionPath = `transactions/${user.uid}/${year}/${month}/${day}/${myuuid}`;
            set(ref(db, transactionPath), {
                transaction_type: 'income',
                source_wallet: this.wallet,
                amount: this.amount,
                Category: this.category,
                description: this.description
            })
            this.amount = ''
            this.category = ''
            this.wallet = ''
            this.description = ''
        },

        showWalletCategories() {
            const auth = getAuth()
            const user = auth.currentUser
            const db = getDatabase()
            // reading wallets from database
            const dataRef = ref(db, 'accounts/' + user.uid);
            onValue(dataRef, (snapshot) => {
            const data = snapshot.val()
            const accountID = data.account
            const walletCategoriesRef = ref(db, `wallets/${accountID}`)
            onValue(walletCategoriesRef, (snapshot) => {
                const wallets = snapshot.val()
                this.walletTypes = Object.keys(wallets)
            })
            })
        },

        showIncomeCategories() {
            const auth = getAuth()
            const user = auth.currentUser
            const db = getDatabase()
            // reading income_categories from database
            const incomeCategoriesRef = ref(db, `users/${user.uid}/income_categories`);
            onValue(incomeCategoriesRef, (snapshot) => {
                const data = snapshot.val()
                if (data !== null) {
                    this.incomeCategories = Object.keys(data)
                } else {
                    console.log("Something wrong")
                }
            });
        }
    }
}
</script>
