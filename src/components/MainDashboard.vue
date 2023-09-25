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
                    <button @click="signOutUser" class="btn" type="button">Log Out</button>
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

            <div>
                <!--Headings-->
                <div class="inline-flex justify-evenly w-full bg-gray-500 rounded">
                    <h1 v-for="(value, key) in headings" :key="key" class="headings2">{{ key }} : {{ value }}</h1>
                </div>

                <!--Bottom Options-->
                <div class="text-white flex justify-evenly absolute inset-x-0 bottom-0 h-7 bg-gray-700 w-auto">
                    <h3>Stats</h3>
                    <h3>Wallets</h3>
                    <h3>Transactions</h3>
                    <h3>More</h3>
                </div>
                <div style="width: 350px;"><canvas id="acquisitions"></canvas></div>
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
            <svg @click="showMainDashboard" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-5 h-5 block m-auto mt-2.5 ">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
        </div>

        <!-- BudgetAccountsSettings -->
        <BudgetAccountsSettings 
        v-show="showOptions === false"
        @fetchIncomeUpdate="evaluationFunction"
        @fetchExpenseUpdate="evaluationFunction" 
        />
        
        <CategoriesSettings 
            v-if="showAddRemSet === false" 
            @hide-add-remove-set="showAddRemSetFun" 
        />

        <UserAccountSettings v-show="showAccSet === false" @hide-acc-set="toggleAccSetFun" />
    </div>
  
</template>

<!--Script Starts From Here-->
<script>
import BudgetAccountsSettings from './BudgetAccountsSettings.vue';
import UserAccountSettings from './UserAccountSettings.vue'
import CategoriesSettings from './CategoriesSettings.vue'
import Chart from 'chart.js/auto';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { onValue, getDatabase, ref, update, get } from "firebase/database";

export default {
    /* eslint-disable */
    name: 'MainDashboard',
    emits: ['hide-add-remove-set', 'signedOut', 'fetchExpenseUpdate', 'fetchIncomeUpdate'],
    props: {
        accountUUID: String,
        headings: Object
    },
    
    components: {
        BudgetAccountsSettings,
        UserAccountSettings,
        CategoriesSettings
    },

    data() { 
        return {
            item: '',
            hideMenu: true,
            showOptions: true,
            showAccSet: true,
            showAddRemSet: true,
            chartObj: null,
            accountData : {},
            myChart: null
        }
    }, 

    beforeMount() {
        const auth = getAuth()
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const user = auth.currentUser
                    const db = getDatabase()
                    const expenseCategoriesRef = ref(db, `users/${user.uid}/expense_categories`)
                    onValue(expenseCategoriesRef, (snapshot) => {
                        const data = snapshot.val()
                        if (data !== null) {
                            this.myChart = data
                        }
                    })
                }
            })
    },

    beforeUpdate() {
        if(!this.chartObj) {
                this.chartObj = new Chart(
                document.getElementById('acquisitions'), 
                { 
                type: 'doughnut',
                data:  {
                labels: Object.keys(this.expensesObjForChart), 
                datasets: [{ data: Object.values(this.expensesObjForChart) }]
                }
                } 
                )
        }
    },

    computed: {
        expensesObjForChart() {
            return this.$store.state.expensesObjectForTracking
        }
    },

    methods: {
        toggleMenu() {      
            this.hideMenu = !this.hideMenu;
        },

        showCardsCategories() {
            this.showOptions = !this.showOptions;
        },

        showMainDashboard() {
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

        signOutUser() {
            this.hideMenu = true;
            const auth = getAuth();
            const user = auth.currentUser
            if (user !== null) {
                signOut(auth)
                    .then(() => {
                        this.$emit('signedOut');
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
            }
        },

        evaluationFunction(data) {
            let amount;
            const db = getDatabase();
            const auth = getAuth();
            const user = auth.currentUser;
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const transactionRef = ref(db, `transactions/${user.uid}/${year}/${month}/${day}/${data}`)
            if (user !== null) {
                // Using get() to fetch data from the specified database reference
                get(transactionRef)
                .then((snapshot) => {
                    if (snapshot.exists() && snapshot.val().transaction_type === "expense") {
                        const transaction = snapshot.val()
                        this.checkAndUpdateExpenses(transaction.amount, transaction.Category)
                        amount = parseInt(transaction.amount);
                        const headingsRef = ref(db, `users/${user.uid}/headings`)
                        get(headingsRef)
                            .then((snapshot) => {
                                const headings = snapshot.val();
                                const ttl = parseInt(headings.total) - amount;
                                const ex = parseInt(headings.expense) + amount;
                                update(headingsRef, {
                                    expense: ex,
                                    total: ttl
                                })
                            })
                            .catch((error) => {
                                console.log(error);
                        })
                    }
                    else if (snapshot.exists() && snapshot.val().transaction_type === "income") {
                        const transaction = snapshot.val();
                        amount = parseInt(transaction.amount);
                        const headingsRef = ref(db, `users/${user.uid}/headings`);

                        get(headingsRef)
                            .then((snapshot) => {
                                const headings = snapshot.val();
                                const totl = parseInt(headings.total) + amount;
                                const inc = parseInt(headings.income) + amount;
                                update(headingsRef, {
                                    income: inc,
                                    total: totl
                                })
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        } 
                    })
                    .catch((error) => {
                        console.error(error);
              });
        }
        else {
            console.log("No data available");
            }
        }, 

        checkAndUpdateExpenses(amount, category) {
            console.log(amount, category)
            const expensesObj = this.expensesObjForChart
            const categories = Object.keys(expensesObj)
            if(categories.includes(category)){
                const prevVal = expensesObj[category]
                expensesObj[category] = parseInt(prevVal) + parseInt(amount)
                const auth = getAuth()
                const user = auth.currentUser
                const db = getDatabase()
                const updateData = {};  
                updateData[category] = parseInt(prevVal) + parseInt(amount);
                const expenseCategoriesRef = ref(db, `users/${user.uid}/expense_categories`)
                update(expenseCategoriesRef, updateData)
            } 
            console.log(this.expensesObjForChart)
        },
    }
}
</script>
