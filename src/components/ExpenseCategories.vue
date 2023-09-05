<template>
<div>

    <!--Read From DataBase and dislay Expense Categories-->
    <!--List Of Expense Categories-->
    <div class="ml-2 grid grid-rows gap-0">
        <h2>Select Category:</h2>
            <label for="Grocery">
                <input v-model="category" value="Grocery" id="Grocery" type="radio">
                Grocery
            </label>
            <label for="Housing">
                <input v-model="category" value="Housing" id="Housing" type="radio">
                Housing
            </label>
            <label for="Utilities">
                <input v-model="category" value="Utilities" id="Utilities" type="radio">
                Utilities
            </label>
            <label for="Petrol">
                <input v-model="category" value="Petrol" id="Petrol" type="radio">
                Petrol
            </label>
    </div>
    <!--Read From DataBase and dislay Expense Categories-->

    <h1>Select Wallet Type</h1>
    <!-- Wallet Types-->
    <div class="ml-2 grid grid-cols-4  gap-0">
        <label for="Cash">
            <input v-model="wallet" value="Cash" id="Cash" type="radio">
            Cash
        </label>
        <label for="Card">
            <input v-model="wallet" value="Card" id="Card" type="radio">
            Card
        </label>
        <label for="Bank">
            <input v-model="wallet" value="Bank" id="Bank" type="radio">
            Bank
        </label>
    </div>

    <div>
        <h2 class="ml-1">Enter Amount:</h2>
        <input @keyup.enter="addExpense" v-model="amount" class="border-4 border-gray-300 m-1" type="text">
        <button class="bg-gray-400 text-white border-2 border-gray-300 rounded-lg pb-0 px-2" @click="addTransaction">
            Add
        </button>
    </div>
</div>
</template>

<script>
import {
    v4 as uuidv4
} from 'uuid';
import {getAuth } from "firebase/auth"
import { ref, set, getDatabase } from "firebase/database";
export default {
    name: 'ExpenseCategories',
    data() {
        return {
            wallet: '',
            amount: '',
            category: ''
        }
    },
    methods: {
        addTransaction() {
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
                destination_wallet: 'accounts_id',
                amount: this.amount,
                Category: this.category,
                description: '.......'
            })
            console.log(year)
        }
    }
}
</script>
