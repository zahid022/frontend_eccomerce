<script setup lang="ts">
import { Tags } from '@/enum/enum';
import { tagsBtnsStore } from '@/stores/public/tags/tagsBtnsStore';
import { storeToRefs } from 'pinia';

const tags = Tags || []

const store = tagsBtnsStore()

const {tag} = storeToRefs(store)

const {SET_TAG} = store

</script>

<template>
    <ul class="flex items-center gap-5">
        <li v-for="(t, index) in tags" :key="t" class="text-[20px] font-serif md:text-[28px] flex items-center gap-5">
            <button @click="() => SET_TAG(t.toLowerCase())" :class="{'active' : (tag === t.toLowerCase())}" class="italic text-[#999] hover:text-[#666]">{{ t }}</button>
            <template v-if="index !== tags.length - 1">
                <span class="text-[#999]">/</span>
            </template>
        </li>
    </ul>
</template>

<style scoped>
.active{
    color: black !important;
}
</style>