<script setup lang="ts">
import api from '@/services/api';
import { onMounted, ref, type Ref } from 'vue';
import Loading from '../loading/Loading.vue';
import type { Trending } from '@/types/type';

const data : Ref<Trending[]> = ref([])
const pending = ref(true)

const getData = async () => {
    pending.value = true
    let res = await api.getAllTrend()
    data.value = res
    pending.value = false
}

onMounted(() => getData())

</script>

<template>
    <section class="py-5">
        <div class="wrapper">
            <div class="flex justify-between items-center mb-3">
                <h2 class="font-serif text-[20px] md:text-[32px] text-[#444]">Trending Categories</h2>
                <button class="text-[#888] underline text-[14px]">Shop All</button>
            </div>

            <template v-if="pending">
                <Loading />
            </template>

            <template v-else>
                <div v-if="data.length > 0" class="flex">
                    <div v-for="product in data" :key="product.id" class="px-1">
                        <div>
                            <img class="rounded-[5px] w-full" :src="product.image" :alt="product.name">
                        </div>
                        <div>
                            <p>{{ product.name }}</p>
                        </div>
                    </div>
                </div>
            </template>

        </div>
    </section>
</template>