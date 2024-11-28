<template>
    <li class="mb-4">
        <button @click="handleFlag" class="flex items-center gap-2">
            <ChevronRightIcon :style="{
                rotate: flag ? '90deg' : '0deg'
            }" class="w-4 h-4 duration-300" />
            <span>{{ item.name }}</span>
        </button>
        <div :class="flag && 'active'">
            <ul class="pl-8 pt-2">
                <li class="mb-2" v-for="(element, index) in item.items" :key="index">
                    <RouterLink :to="element.path.toString()">{{ element.name }}</RouterLink>
                </li>
            </ul>
        </div>
    </li>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/outline'
import type { adminSidebarData } from '@/types/sidebar';
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const props = defineProps<{
    item: adminSidebarData
}>()

const flag = ref<boolean>()

const handleFlag = () => {
    flag.value = !flag.value
}

</script>

<style scoped>
div {
    max-height: 0;
    height: 100%;
    transition: max-height .3s;
    visibility: hidden;
}

.active {
    max-height: 300px;
    visibility: visible;
}
</style>