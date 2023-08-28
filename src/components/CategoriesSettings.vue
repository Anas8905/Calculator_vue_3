<template>
    <div>
        <div class="bg-gray-200 flex justify-evenly  mt-2 mb-4 rounded">

            <!--This is Logo-->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 my-1 float-left mr-auto">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
            </svg>
            <h1 class="text-3xl mt-1 float-left mr-auto">Budget Buddy</h1>
        </div>

        <div>
            <h2 class="text-center ">Select the type to add or remove categories :</h2>
            <div class="flex justify-evenly mt-5">
                <button @click="showIncomes" type="button" class="headings3">Income</button>
                <button @click="showExpenses" type="button" class="headings3">Expense</button>
            </div>
        </div>

        <!--Div for Expense's settings-->
        <div :class="{hidden: selectExpense}">
            <div>
                <input v-model="text" class="m-3" type="text">
                <button @click="addExpenseFunc" class="headings3" type="button">Add</button>
            </div>

            <!--This is list of All the expenses category-->
            <div>
                <ul v-for="(item,index) in expenseCategories" :key="index">
                    <li @click="filterandDeletefromExpense(item)" class="ml-2">
                        {{ item.category }}
                    </li>
                </ul>
            </div>
        </div>

        <!--Div for Icome's settings-->
        <div :class="{hidden: selectIncome}">
            <div>
                <input v-model="text" type="text" class="m-3">
                <button @click="addIncomeFunc" class="headings3" type="button">Add</button>
            </div>

            <!--List of Incomes Categories-->
            <div>
                <ul v-for="(item, index) in incomeCategories" :key="index">
                    <li @click="filterandDeletefromIncome(item)" class="ml-2">
                        {{ item.category }}
                    </li>
                </ul>
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
export default {
    name: 'CategoriesSettings',

    props: {
        expenseCategories: Object,
        incomeCategories: Object,
    },

    data() {
        return {
            text: '',
            category: '',
            selectExpense: true,
            selectIncome: true
        }
    },

    methods: {
        addExpenseFunc() {
            this.$emit('update-expense-category', this.text)
            this.text = ''
        },

        addIncomeFunc(){
            this.$emit('update-income-category', this.text)
            this.text = ''
        },

        goToHomePage() {
            this.$emit('hide-add-remove-set')
        },

        filterandDeletefromExpense(item) {
            this.$emit('delete-from-expenses', item)
        },

        filterandDeletefromIncome(item){
            this.$emit('delete-from-incomes', item)
        },

        showExpenses() {
            this.selectExpense = false
            this.selectIncome = true
        },

        showIncomes(){
            this.selectIncome = false
            this.selectExpense = true
        }
    }
}
</script>
