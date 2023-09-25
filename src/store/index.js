/* eslint-disable */
import { createStore } from "vuex";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, getDatabase, onValue } from "firebase/database";

// Create a new store instance.
const store = createStore({
    state() {
        return {
            userID: "",
            walletCategories: {},
            expenseCategories: [],
            incomeCategories: [],
            expensesObjectForTracking: {}
        };
    },
    mutations: {
        userIDReader(state) {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    state.userID = user.uid;
                }
            });
        },

        showWalletCategories(state) {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const user = auth.currentUser;
                    const db = getDatabase();
                    // reading wallets from database
                    const dataRef = ref(db, "accounts/" + user.uid);
                    onValue(dataRef, (snapshot) => {
                        const data = snapshot.val();
                        const accountID = data.account;
                        const walletCategoriesRef = ref(db, `wallets/${accountID}`);
                        onValue(walletCategoriesRef, (snapshot) => {
                            const wallets = snapshot.val();
                            state.walletCategories = Object.keys(wallets);
                        });
                    });
                }
            });
        },

        showExpense_And_EncomeCategories(state) {
            const auth = getAuth()
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const user = auth.currentUser
                    const db = getDatabase()
                    // reading expense_categories from database
                    const expenseCategoriesRef = ref(db, `users/${user.uid}/expense_categories`)
                    const incomeCategoriesRef = ref(db, `users/${user.uid}/income_categories`)
                    onValue(expenseCategoriesRef, (snapshot) => {
                        const data = snapshot.val()
                        if (data !== null) {
                            state.expenseCategories = Object.keys(data)
                        }
                    })
                    onValue(incomeCategoriesRef, (snapshot) => {
                        const data = snapshot.val()
                        if (data !== null) {
                            state.incomeCategories = Object.keys(data)
                        }
                    })
                }
                else {
                    alert("User Not Found")
                }
            });
        },

        readExpenseCategory(state) {
            const auth = getAuth()
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const user = auth.currentUser
                    const db = getDatabase()
                    const expenseCategoriesRef = ref(db, `users/${user.uid}/expense_categories`)
                    onValue(expenseCategoriesRef, (snapshot) => {
                        const data = snapshot.val()
                        if (data !== null) {
                            state.expensesObjectForTracking = data
                        }
                    })
                }
            })
        }
    },
});

export default store;
