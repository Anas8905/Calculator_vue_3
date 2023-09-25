<template>
<div>
    <div class="bg-gray-200 flex justify-evenly mt-2 mb-4 rounded">

        <!--This is Logo-->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 my-1 float-left mr-auto">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
        </svg>
        <h1 class="text-3xl mt-1 float-left mr-auto">Budget Buddy</h1>
    </div>
    <h2 class="text-center text-base font-semibold">Select the type to add or remove categories :</h2>

    <div class="grid grid-flow-row text-center">

        <!--Div for Expense's settings-->
        <button @click="showExpenses" type="button" class="headings3">Expense</button>
        <div :class="{hidden: hideExpense}">
            <div>
                <h2 class="text-lg font-semibold ">Add category in Expenses</h2>
                <input v-model="item" class="inpt mx-2" type="text">
                <button @click="addExpenseInDataBase" class="bg-gray-400 text-white border-2 border-gray-300 rounded-lg px-1 pb-0" type="button">Add</button>
            </div>
        </div>

        <!--Div for Income's settings-->
        <button @click="showIncomes" type="button" class="headings3">Income</button>
        <div :class="{hidden: hideIncome}">
            <div>
                <h2 class="text-lg font-semibold">Add category in Incomes</h2>
                <input v-model="item" type="text" class="inpt mx-2">
                <button @click="addIncomeInDataBase" class="bg-gray-400 text-white border-2 border-gray-300 rounded-lg px-1 pb-0" type="button">Add</button>
            </div>
        </div>

        <!--Div for Wallet's settings-->
        <button @click="showWallets" type="button" class="headings3">Wallets</button>
        <div>
            <div :class="{hidden: hideWallets}">
                <h2 class="text-lg font-semibold">Add category in Wallets</h2>
                <input v-model="item" type="text" class="inpt mx-2">
                <button @click="addWalletInDatabase" class="bg-gray-400 text-white border-2 border-gray-300 rounded-lg px-1 pb-0" type="button">Add</button>
            </div>
        </div>
    </div>

    <!--This Is Home Button-->
    <div class="h-10 w-10 rounded-full absolute bottom-12 right-5 bg-red-400">
        <svg @click="goToHomePage" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-5 h-5 block m-auto mt-2.5 ">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
    </div>
</div>
</template>

<script>
import { ref, getDatabase, update, get } from "firebase/database";
export default {

    name: 'CategoriesSettings',

    data() {
        return {
            item: '',
            Obj: {},
            accountID: '',
            hideExpense: true,
            hideIncome: true,
            hideWallets: true,

        }
    },

    beforeMount(){
        this.$store.commit('userIDReader')
    },

//getting userID from Vuex Store
    computed:{
        userID(){
            return this.$store.state.userID
        }
    },

    methods: {
        goToHomePage() {
            this.$emit('hide-add-remove-set')
        },

        showExpenses() {
            this.hideExpense = !this.hideExpense
            this.hideIncome = true
            this.hideWallets = true
        },

        showIncomes() {
            this.hideIncome = !this.hideIncome
            this.hideExpense = true
            this.hideWallets = true
        },

        showWallets() {
            this.hideWallets = !this.hideWallets
            this.hideExpense = true
            this.hideIncome = true
        },

        addIncomeInDataBase() {
            const db = getDatabase()

            // Path for income_categories Node
            get(ref(db, `users/${this.userID}/income_categories`))
                .then((snapshot) => {
                    if (snapshot.exists()) {

                        //Read and store income_category Node from database in 'this.check' variabe to check
                        //the category is already existed or not
                        this.check = snapshot.val()
                        const path = ref(db, 'users/' + this.userID + '/income_categories')
                        this.updateCategory(this.item, this.check, this.Obj, path, "income")
                    }
                    else {
                        alert("Something Wrong")
                    }
                })
                .catch((error) => {
                    alert(error)
                })
        },

        addExpenseInDataBase() {
            const db = getDatabase()

            // Path for expense_categories Node
            get(ref(db, `users/${this.userID}/expense_categories`))
                .then((snapshot) => {
                    if (snapshot.exists()) {

                        //Read and store expense_category Node from database in 'this.check' variabe to check
                        //the category is already existed or not
                        this.check = snapshot.val()
                        const path = ref(db, 'users/' + this.userID + '/expense_categories')

                        //Updating using helper function
                        this.updateCategory(this.item, this.check, this.Obj, path, "expense")
                    } 
                    else {
                        alert("Something Wrong")
                    }
                })
                .catch((error) => {
                    alert(error)
                })
        },

        addWalletInDatabase() {
            const db = getDatabase()
            const dbRef = ref(db, `accounts/${this.userID}`)

            // Firstly, finding out the account ID of current user
            get(dbRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        this.accountID = snapshot.val().account
                        const walletsRef = ref(db, `wallets/${this.accountID}`)

                        //Secondly, Read and store wallet Node from database in 'this.check' variabe to check
                        //the category is already existed or not
                        get(walletsRef)
                            .then((snapshot) => {
                                if (snapshot.exists()) {
                                    this.check = snapshot.val()
                                    const path = ref(db, `wallets/${this.accountID}`)
                                    this.updateCategory(this.item, this.check, this.Obj, path, "wallet")
                                } 
                                else {
                                    alert("Something Wrong with Wallet Path")
                                }
                            })
                            .catch((error) => {
                                alert(error)
                            })
                    } 
                    else {
                        alert("Something Wrong Account path")
                    }
                })
                .catch((error) => {
                    alert(error)
                })
        },

        updateCategory(item, check, obj, path, type) {
            if (item in check === false) {
                obj[item] = 0
                const updates = obj
                update(path, updates)
                    .then(() => {
                        if(type === "expense") {
                            this.showExpenses()
                        }
                        else if(type === "income") {
                            this.showIncomes()
                        }
                        else {
                            this.showWallets()
                        }
                        this.item = ''
                        this.Obj = {}
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } 
            else {
                alert('Category Already Present')
            }
        }
    }
}
</script>
