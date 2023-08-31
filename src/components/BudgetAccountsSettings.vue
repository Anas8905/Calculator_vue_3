<template>
    <div>
        <!--This is Logo-->
        <div class="bg-gray-200 flex justify-evenly  mt-2 mb-4 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 my-1 float-left mr-auto">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
            </svg>
            <h1 class="text-3xl mt-1 float-left mr-auto">Budget Buddy</h1>
        </div>
        
            <!--Wallet Types-->
        <div v-show="displayWallets === true" class="ml-2 grid grid-cols-4  gap-0">
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
            <button @click="toggleWalletCategories" class="rounded-sm bg-green-400 text-white mr-1" type="button">
                Select
            </button>
        </div>
        <!--Budget Types-->
        <div v-show="displayWallets === false">
            <div class="content-center m-4">
                <button @click="toggleWalletCategories" class="rounded-sm bg-green-400 text-white px-2" type="button">
                    Change Wallet
                </button>
            </div>
            <div class="flex justify-evenly">
                <h3 @click="toggleIncomes" class="headings3" >Income</h3>
                <h3 @click="toggleExpense" class="headings3" >Expense</h3>
                <h3 @click="toggleTransfer" class="headings3" >Transfer</h3>
            </div>

            <ExpenseCategories  
            :expenseCategories="expenseCategories" 
            :class="{hidden: displayExpenses}" 
            @increment-expense="evaluateTotalExpense" 
            />

            <IncomeCategories 
            :incomeCategories="incomeCategories" 
            :class="{hidden: displayIncomes}" 
            @increment-income="evaluateTotalIncome" 
            />

            <TransferCategories :class="{hidden: displayTransfers}" />
        </div>
    </div>
</template>

<script>
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

    props: {
        expenseCategories: Object,
        incomeCategories: Object,
    },

    data() {
        return {
            wallet: '',
            displayExpenses: false,
            displayIncomes: true,
            displayTransfers: true,
            displayWallets: true
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

        evaluateTotalExpense(data){
            this.$emit('increment-expense', data)
        },

        evaluateTotalIncome(data){
            this.$emit('increment-income', data)
        },

        toggleWalletCategories(){
            this.displayWallets = !this.displayWallets
        }
    }
}
</script>
