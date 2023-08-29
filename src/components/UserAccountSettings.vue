<template>
<div>
    <!--This Is Home Button-->
    <div class="h-10 w-10 rounded-full absolute bottom-12 right-5 bg-red-400">
            <svg @click="gotoHomePage" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-5 h-5 block m-auto mt-2.5 ">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
        </div>
</div>
</template>

<script>
export default {
    name: "UserAccountSettings",
    methods: {
        gotoHomePage() {
            this.$emit('hide-acc-set')
        },
    }
}
</script>
