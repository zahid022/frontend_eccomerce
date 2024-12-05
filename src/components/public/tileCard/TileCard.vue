<script setup lang="ts">
import type { tileSlider } from '@/types/type';

const props = defineProps<{
    data: tileSlider
}>()
</script>

<template>
    <RouterLink to="/" class="block tile_card relative">
        <figure class="relative">
            <img class="w-full rounded-[4px]" :src="data.image" :alt="data.name">
        </figure>
        <div class="absolute over z-10 bottom-0 left-0 right-0 h-[60%]"></div>
        <div class="absolute z-20 flex flex-col bottom-0 left-0 py-[38px] px-12">
            <p class="text-white mb-1 text-[18px]">Explore</p>
            <button class="text-white border-b border-transparent tile_btn text-[24px]">{{ data.name }}</button>
        </div>
    </RouterLink>
</template>

<style scoped>
.tile_card:hover .tile_btn {
    border-color: #fff;
}

.over {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.3) 100%);
}
</style>