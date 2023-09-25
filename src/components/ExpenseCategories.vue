<template>
<div>
    <!--List Of Expense Categories-->
    <button @click="showExpenseCategories" type="button" class="ml-2 my-2 text-base font-semibold">Select Expense Category:</button>
    <div class="ml-2 grid grid-rows gap-0">
        <label v-for="(item, index) in expenseCategories" :key="index" :for="'category_' + index">
            <input class="radiobtn" v-model="category" :value="item" :id="'category_' + index" type="radio">
            {{ item }}
        </label>
    </div>

    <!-- Wallet Types-->
    <h2 class="ml-2 my-2 text-base font-semibold">Select Wallet Type:</h2>
    <div class="ml-2 grid grid-cols-4 gap-0">
        <label v-for="(item, index) in walletCategories" :key="index" :for="'category' + index">
            <input class="radiobtn" v-model="wallet" :value="item" :id="'category' + index" type="radio">
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
        <input @keyup.enter="addTransaction" v-model="amount" class="border-4 border-gray-300 m-1" type="number">
        <button class="bg-gray-400 text-white border-2 border-gray-300 rounded-lg px-1 pb-0" @click="addTransaction">
            Add
        </button>
    </div>
</div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from "firebase/auth"
import { ref, set, getDatabase } from "firebase/database";
export default {
    /* eslint-disable */
    name: 'ExpenseCategories',
    data() {
        return {
            amount: '',
            wallet: '',
            category: '',
            description: '',
        }
    },

    beforeMount() {
        this.$store.commit('showWalletCategories')
        this.$store.commit('showExpense_And_EncomeCategories')
    },

    computed: {
        walletCategories() {
            return this.$store.state.walletCategories
        },

        expenseCategories() {
            return this.$store.state.expenseCategories
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
                transaction_type: 'expense',
                source_wallet: this.wallet,
                amount: this.amount,
                Category: this.category,
                description: this.description
            })
            this.amount = ''
            this.category = ''
            this.wallet = ''
            this.description = ''
            this.$emit('fetchExpenseUpdate', myuuid)
        },
    }
}
</script>
