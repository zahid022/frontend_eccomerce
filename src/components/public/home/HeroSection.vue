<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import imgMD from "@/assets/img/public/hero-sm.jpg"
import imgLG from "@/assets/img/public/hero-lg.jpg"
import { RouterLink } from 'vue-router';

const screenWidth = ref(window.innerWidth)

const updateScreenWidth = () => {
    screenWidth.value = window.innerWidth
}

onMounted(() => {
    window.addEventListener('resize', updateScreenWidth)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateScreenWidth)
})

const backgroundImage = ref((screenWidth.value > 850) ? imgLG : imgMD)

watch(screenWidth, (newWidth) => {
    backgroundImage.value = newWidth > 850 ? imgLG : imgMD
})
</script>

<template>
    <section class="bg-cover" :style="{ 'background-image': `url(${backgroundImage})` }">
        <RouterLink to="/" class="min-h-[90vh] cursor-pointer flex justify-center items-center">
            <div class="flex flex-col justify-center items-center gap-10">
                <h1 class="text-[36px] cursor-default md:text-[44px] lg:text-[52px] font-medium text-white">Winter
                    Favorites</h1>
                <RouterLink to="/"
                    class="bg-white text-black md:text-[18px] py-[10px] px-5 rounded-[3px] uppercase text-[16px] tracking-[1.25px] font-medium">
                    Shop Trending</RouterLink>
            </div>
        </RouterLink>
    </section>
</template>
