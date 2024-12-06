<script setup lang="ts">
import type { product } from '@/types/dbType';

const props = defineProps<{
    item: product
}>()

</script>

<template>
    <div class="bg-[#F5F5F7] cursor-pointer py-10 px-4">
        <img class="w-full object-cover" :src="item.img[0]" :alt="item.name" />
    </div>
</template>