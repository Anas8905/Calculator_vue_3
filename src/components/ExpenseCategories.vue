<template>
<div>

    <!--List Of Expense Categories-->
    <h2 class="ml-1">Select Category:</h2>
    <div class="ml-2 grid grid-rows gap-0">
        <label v-for="(item, index) in expenseCategories" :key="index" :for="index">
            <input class="inline" type="radio" :value="item.category" v-model="el.category">
            {{item.category}}
        </label>
    </div>
    <div>
        <h2 class="ml-1">Enter Amount:</h2>
        <input @keyup.enter="addExpense" v-model="el.ammount" class="border-4 border-gray-300 m-1" type="text">
        <button class="bg-gray-400 text-white border-2 border-gray-300 rounded-lg px-1 pb-0" @click="addExpense">Add Expense</button>
    </div>
</div>
</template>

<script>
export default {
    name: 'ExpenseCategories',
    props: {
        expenseCategories: Object
    },
    data() {
        return {
            el: {
                category: '',
                ammount: ''
            }
        }
    },
    methods: {
        addExpense() {
            this.$emit('increment-expense', this.el)
            this.el = {
                category: '',
                ammount: ''
            }
        }
    }
}
</script>
