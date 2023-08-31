<template>
    <div>
        <!--Menu options-->
        <div v-if="!hideMenu" class="block bg-gray-100 overflow-auto shadow-md z-10 absolute top-10 right-0">
            <ul>
                <li>
                    <button @click="toggleAccSetFun" class="btn" type="button">Account Settings</button>
                </li>
                <li>
                    <button @click="showAddRemSetFun" class="btn" type="button">Add / Remove</button>
                </li>
                <li>
                    <button class="btn" type="button">Report</button>
                </li>
                <li>
                    <button @click="signOut" class="btn" type="button">Log Out</button>
                </li>
            </ul>
        </div>

        <div v-show="showOptions && showAccSet && showAddRemSet">
            <div class="bg-gray-200 flex justify-evenly mt-2 mb-4 rounded">

                <!--This is Logo-->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 my-1 float-left mr-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>

                <h1 class="text-3xl mt-1 float-left mr-auto">Budget Buddy</h1>

                <!--This Is Menu Icon-->
                <svg @click="toggleMenu" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mt-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
                    <!--Bottom Options-->
            <div>
                    <div class="text-white flex justify-evenly absolute inset-x-0 bottom-0 h-7 bg-gray-700 w-auto">
                        <h3>Stats</h3>
                        <h3>Wallets</h3>
                        <h3>Transactions</h3>
                        <h3>More</h3>
                    </div>
            </div>
                <div class="hidden" style="width: 350px;"><canvas id="acquisitions"></canvas></div>

            <!--Accounts Add/Remove-->
            <div>
                <h2 class="ml-2 mb-2">Add Account</h2>
                <input v-model="item" type="text">
                <button @click="addAccountIDinDatabase" type="button">add</button>
                <ul v-for="(item,index) in accountsTypes" :key="index">
                    <li class="m-2">
                        {{ item }}
                    </li>
                </ul>
            </div>
            
            <!--This is Add button-->
            <div class="h-10 w-10 rounded-full absolute bottom-12 right-5 bg-red-400">
                <svg @click="showCardsCategories" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-5 h-5 block m-auto mt-2.5 ">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>
        </div>

        <!-- This Is Home Button -->
        <div v-show="!showOptions" class="h-10 w-10 rounded-full absolute bottom-12 right-5 bg-red-400">
            <svg @click="showHeaderComponent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-5 h-5 block m-auto mt-2.5 ">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>

        </div>

        <!-- Components -->
        <BudgetAccountsSettings 
            v-show="showOptions === false"
            :expense-categories="explicitExpenseCategories" 
            :income-categories="explicitIncomeCategories"
            @increment-income="evaluateTotalIncome" 
            @increment-expense="evaluateTotalExpense" 
        />
        
        <CategoriesSettings 
            v-if="showAddRemSet === false"
            :income-categories="explicitIncomeCategories" 
            :expense-categories="explicitExpenseCategories" 
            @delete-from-expenses="removeExpense" 
            @delete-from-incomes="removeIncome"
            @update-income-category="updateIncomes" 
            @update-expense-category="updateExpenses" 
            @hide-add-remove-set="showAddRemSetFun" 
        />

        <UserAccountSettings  
            v-show="showAccSet === false"
            @hide-acc-set="toggleAccSetFun" 
        />
    </div>
</template>

<!--Script Starts From Here-->
<script>
import {v4 as uuidv4} from 'uuid';
import BudgetAccountsSettings from './BudgetAccountsSettings.vue';
import UserAccountSettings from './UserAccountSettings.vue'
import CategoriesSettings from './CategoriesSettings.vue'
// import Chart from 'chart.js/auto';
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";

export default {
    name: 'MainDashboard',
    
    emits: [
            'increment-expense', 'increment-income', 
            'delete-from-expenses', 'update-expense-category', 
            'hide-add-remove-set', 'update-income-category'
            ],
    
    components: {
        BudgetAccountsSettings,
        UserAccountSettings,
        CategoriesSettings
    },

    data() {
        return {
            accountsTypes:[],
            item: '',
            hideMenu: true,
            showOptions: true,
            showAccSet: true,
            showAddRemSet: true,
            chartObj: null,
        }
    },

    methods: {
        toggleMenu() {
            this.hideMenu = !this.hideMenu;
        },

        showCardsCategories() {
            this.showOptions = !this.showOptions;
        },

        showHeaderComponent() {
            this.showOptions = true;
        },

        toggleAccSetFun() {
            this.showAccSet = !this.showAccSet;
            this.hideMenu = true;
        },

        showAddRemSetFun() {
            this.showAddRemSet = !this.showAddRemSet;
            this.hideMenu = true;
        },

        updateExpenses(data) {
            this.explicitExpenseCategories.push({
                category: data,
                ammount: 0
            }) 
        },

        updateIncomes(data) {
            this.explicitIncomeCategories.push({
                category: data,
                ammount: 0
            })
        },

        removeExpense(data) {
            const index = this.explicitExpenseCategories.indexOf(data)
            this.explicitExpenseCategories.splice(index, 1)
        },

        removeIncome(data) {
            const index = this.explicitIncomeCategories.indexOf(data)
            this.explicitIncomeCategories.splice(index, 1) 
        },

        evaluateTotalIncome(data) {
            for (let i = 0; i < this.explicitIncomeCategories.length; i++) {
                if (this.explicitIncomeCategories[i].category === data.category) {
                    this.explicitIncomeCategories[i].ammount =  this.explicitIncomeCategories[i].ammount + parseInt(data.ammount)
                    break;
                }
            }
            this.headingsForDetails[0].ammount = this.headingsForDetails[0].ammount + parseInt(data.ammount)
            this.headingsForDetails[2].ammount = this.headingsForDetails[2].ammount + parseInt(data.ammount)
        },

        evaluateTotalExpense(data) {
            for (let i = 0; i < this.explicitExpenseCategories.length; i++) {
                if (this.explicitExpenseCategories[i].category === data.category) {
                    this.explicitExpenseCategories[i].ammount = this.explicitExpenseCategories[i].ammount + parseInt(data.ammount)
                    break;
                }
            }
            this.headingsForDetails[1].ammount = this.headingsForDetails[1].ammount + parseInt(data.ammount)
            this.headingsForDetails[2].ammount = this.headingsForDetails[2].ammount - parseInt(data.ammount)
        },

        signOut(){
            const auth = getAuth();
            signOut(auth).then(() => {
            // Sign-out successful.
            this.$emit('signedOut')
            }).catch((error) => {
            alert(error)
            });
        },

        readDataFromDB(){
            const db = getDatabase();
            const auth = getAuth();
            const user = auth.currentUser;
            if (user !== null) {
            const printdata = ref(db, 'users/' + user.uid);
            onValue(printdata, (snapshot) => {
            const data = snapshot.val();
            console.log(data)
            });
            }
        },

        addAccountIDinDatabase(){
            this.accountsTypes.push(this.item)
            this.item = ''
            const myuuid = uuidv4()
            const db = getDatabase()
            const auth = getAuth()
            const user = auth.currentUser
            set(ref(db, 'accounts/' + user.uid),{
                account_1: myuuid
            })
        },
    },
}
</script>
