<script setup lang="ts">
import { RouterLink } from 'vue-router';
import CardIcon from '../icons/CardIcon.vue';
import { sidebarMenu } from '@/stores/public/sidebarMenu';
import { storeToRefs } from 'pinia';
import UserIcon from '../icons/UserIcon.vue';
import SearchIcon from '../icons/SearchIcon.vue';

const store = sidebarMenu()

const { flag } = storeToRefs(store)

const { SET_FLAG } = store

</script>

<template>
    <header class="bg-black sticky top-0 left-0 right-0 z-[999] py-4">
        <div class="flex wrapper items-center">
            <div class="w-4/12 md:hidden">
                <button @click="() => SET_FLAG(!flag)" id="button-toggle">
                    <span :class="{ 'span-first-active': flag }"></span>
                    <span :class="{ 'span-second-active': flag }"></span>
                    <span></span>
                </button>
            </div>
            <div class="w-4/12 hidden md:gap-8 md:flex">
                <p>
                    <RouterLink class="text-[#ccc] text-[18px]" to="/">
                        Shop
                    </RouterLink>
                </p>
                <p>
                    <RouterLink class="text-[#ccc] text-[18px]" to="/">
                        Features
                    </RouterLink>
                </p>
            </div>
            <div class="w-4/12 flex justify-center">
                <RouterLink class="uppercase text-[18px] md:text-[20px] font-normal text-white tracking-widest" to="">Proper Cloth
                </RouterLink>
            </div>
            <div class="w-4/12 flex items-center md:gap-8 justify-end">
                <RouterLink
                    class="text-white hidden md:flex leading-[36px] h-9 items-center justify-center font-light text-[12.5px]"
                    to="/">
                    <SearchIcon />
                </RouterLink>
                <RouterLink
                    class="text-white leading-[36px] h-9 hidden md:flex items-center justify-center font-light text-[12.5px]"
                    to="/">
                    <UserIcon />
                </RouterLink>
                <RouterLink
                    class="text-white leading-[36px] h-9 flex items-center justify-center font-light text-[12.5px]"
                    to="/">
                    <CardIcon />
                </RouterLink>
            </div>
        </div>
    </header>
</template>

<style scoped>
#button-toggle span {
    display: block;
    height: 1px;
    width: 30px;
    background-color: #fff;
    transition: width .3s;
}

#button-toggle span:nth-child(1) {
    margin-bottom: 6px;
}

#button-toggle span:nth-child(2) {
    margin-bottom: 6px;
}

.span-first-active {
    width: 10px !important;
}

.span-second-active {
    width: 20px !important;
}
</style>