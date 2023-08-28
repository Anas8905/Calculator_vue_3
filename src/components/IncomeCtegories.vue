<template>
<div>
    <h2 class="ml-1">Select Category:</h2>

    <!--List Of Expense Categories-->
    <div class="ml-2 grid grid-rows gap-0">
        <label  v-for="(item, index) in incomeCategories" :key="index" :for="index">
            <input
            class="inline"
            type="radio"
            :value="item.category"
            v-model="el.category"
            >
            {{item.category}}
        </label>
    </div>
    <div>
        <h2 class="ml-1">Enter Amount:</h2>
        <input @keyup.enter="addAmount" v-model="el.ammount" class="border-4 border-gray-300 m-1" type="text">
        <button class="bg-gray-400 text-white border-2 border-gray-300 rounded-lg px-1 pb-0" @click="addAmount">Add Amount</button>
    </div>
</div>
</template>

    
<script>
export default {
    name: 'IncomeCategories',
    props: {
        incomeCategories: Object
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
        addAmount() {
            this.$emit('increment-income', this.el)
            this.el = {
                category: '',
                ammount: ''
            }
        }
    }
}
</script>
