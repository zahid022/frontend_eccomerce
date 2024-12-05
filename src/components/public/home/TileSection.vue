<script setup lang="ts">
import TileCard from '../tileCard/TileCard.vue';
import api from '@/services/api';
import type { tileSlider } from '@/types/type';
import { onMounted, ref, type Ref } from 'vue';

const data : Ref<tileSlider[]> = ref([])

onMounted(() => { getData()})

const getData = async () => {
    let response = await api.getAllTile()
    data.value = response
}

</script>

<template>
    <section class="py-10">
        <div class="wrapper">
            <div class="flex flex-wrap">

                <template v-if="data.length > 0">
                    <div v-for="(sliderData, index) in data" :key="index"
                        class="w-full mb-4 md:px-1 md:mb-0 md:w-6/12">
                        <TileCard :data="sliderData" />
                    </div>
                </template>

            </div>
        </div>
    </section>
</template>