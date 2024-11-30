<script setup lang="ts">
import ConfirmDeleteBrand from '@/components/admin/brand/modal/ConfirmDeleteBrand.vue';
import api from '@/services/api';
import { confirmBrand } from '@/stores/admin/brand/modal/confirmBrand';
import type { brand } from '@/types/dbType';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';

let data = ref<brand[]>([])

const store = confirmBrand()

const {SET_BRAND_ID, SET_BRAND_NAME, SET_CONFIRM_FLAG} = store

const {confirmFlag} = storeToRefs(store)

const getBrands = async () => {
    try {
        const response = await api.getBrand();
        data.value = response;
    } catch (error) {
        console.error("Error fetching brand:", error);
    }
}

onMounted(() => getBrands())

watch(() => confirmFlag.value, () => getBrands())

const handleDelete = (bool : boolean, name : string, id : number) => {
    SET_BRAND_ID(id)
    SET_BRAND_NAME(name)
    SET_CONFIRM_FLAG(bool)
}
</script>

<template>
    <ConfirmDeleteBrand />
    <h1 class="mb-4 text-white font-medium text-[2em] text-center">Brands</h1>
    <table>
        <thead>
            <tr>
                <th class="w-[10%]">#</th>
                <th class="w-[30%]">Name</th>
                <th class="w-[30%]">Slug</th>
                <th class="w-[30%]">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(brand, index) in data" :key="brand.id">
                <td class="w-[10%]">{{ index + 1 }}</td>
                <td class="w-[30%]">{{ brand.name }}</td>
                <td class="w-[30%]">{{ brand.slug }}</td>
                <td class="w-[30%]">
                    <div class="flex justify-around items-center">
                        <button class="block w-5/12 py-2 bg-lime-700 text-white rounded-md font-medium">Edit</button>
                        <button @click="() => handleDelete(true, brand.name, brand.id as number)" class="block w-5/12 py-2 bg-red-700 text-white rounded-md font-medium">Delete</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
table {
    width: 100%;
}

thead tr:nth-child(1) {
    cursor: default;
    background-color: #20202e;
}

tr {
    color: #fff;
    cursor: pointer;
}

tr:nth-child(even) {
    background-color: #20202e;
    color: #fff;
}

td {
    padding: 12px 0;
    text-align: center
}

th {
    padding: 12px 0;
    font-size: 16px;
    font-weight: 500;
}
</style>