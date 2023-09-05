<template>
    <div>
        <!--This is Logo-->
        <div class="bg-gray-200 flex justify-evenly  mt-2 mb-4 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 my-1 float-left mr-auto">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
            </svg>
            <h1 class="text-3xl mt-1 float-left mr-auto">Budget Buddy</h1>
        </div>
        
        <!--Budget Types-->
            <div class="flex justify-evenly">
                <button @click="toggleIncomes" class="headings3" >Income</button>
                <button @click="toggleExpense" class="headings3" >Expense</button>
                <button @click="toggleTransfer" class="headings3" >Transfer</button>
            </div>

            <ExpenseCategories :class="{hidden: displayExpenses}" />

            <IncomeCategories :class="{hidden: displayIncomes}" />

            <TransferCategories :class="{hidden: displayTransfers}" />
    </div>
</template>

<script>
// import { ref, set, getDatabase } from "firebase/database";
import ExpenseCategories from "./ExpenseCategories.vue"
import IncomeCategories from "./IncomeCtegories.vue"
import TransferCategories from "./TransferCategories.vue"

export default{
    name: "BudgetAccountsSettings", 

    components: {
        ExpenseCategories,
        IncomeCategories,
        TransferCategories,
    },
    
    data() {
        return {
            wallet: '',
            displayExpenses: false,
            displayIncomes: true,
            displayTransfers: true,
        }
    },

    methods: {
        toggleExpense() {
            this.displayExpenses = false
            this.displayIncomes = true
            this.displayTransfers = true
        },

        toggleIncomes() {
            this.displayExpenses = true
            this.displayIncomes = false
            this.displayTransfers = true
        },

        toggleTransfer() {
            this.displayExpenses = true
            this.displayIncomes = true
            this.displayTransfers = false
        },
    }
}
</script>
