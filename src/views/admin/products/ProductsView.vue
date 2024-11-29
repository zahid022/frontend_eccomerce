<script setup lang="ts">
import ConfirmModal from '@/components/admin/product/modal/ConfirmModal.vue';
import EditProductSidebar from '@/components/admin/product/sidebar/EditProductSidebar.vue';
import api from '@/services/api';
import { confirmProduct } from '@/stores/admin/product/modal/confirmProduct';
import { editProduct } from '@/stores/admin/product/sidebar/editProduct';
import type { product } from '@/types/dbType';
import { storeToRefs } from 'pinia';
import { ref, onMounted, watch } from 'vue';

// pinia store 
const store = confirmProduct()
const { confirmFlag } = storeToRefs(store)
const { SET_CONFIRM_FLAG, SET_CONFIRM_PRODUCT_NAME, SET_CONFIRM_PRODUCT_ID } = store

const showModal = (id: number | undefined, name: string) => {
    SET_CONFIRM_FLAG(true)
    SET_CONFIRM_PRODUCT_NAME(name)
    if (typeof id === "number") SET_CONFIRM_PRODUCT_ID(id)
}

// all products 
const data = ref<product[]>([]);

const getProducts = async () => {
    try {
        const response = await api.getProducts();
        data.value = response;
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}
onMounted(() => getProducts());

watch(() => confirmFlag.value, () => getProducts())

</script>

<template>
    <EditProductSidebar />
    <ConfirmModal />
    <h1 class="mb-4 text-white font-medium text-[2em] text-center">Products</h1>
    <table>
        <thead>
            <tr>
                <th class="w-[5%]">#</th>
                <th class="w-[10%]">Name</th>
                <th class="w-[16%]">Description</th>
                <th class="w-[5%]">Stock</th>
                <th class="w-[7%]">Price</th>
                <th class="w-[7%]">Discount</th>
                <th class="w-[10%]">Size</th>
                <th class="w-[10%]">Color</th>
                <th class="w-[10%]">Brand</th>
                <th class="w-[10%]">Category</th>
                <th class="w-[10%]">Sub-Category</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(product, index) in data" :key="product.id" @click="() => showModal(product.id, product.name)">
                <td class="w-[5%]">{{ index + 1 }}</td>
                <td class="w-[10%]">{{ product.name }}</td>
                <td class="w-[16%]">{{ product.description }}</td>
                <td class="w-[5%]">{{ product.stock }}</td>
                <td class="w-[7%]">{{ product.price }}</td>
                <td class="w-[7%]">{{ product.discount }}</td>
                <td class="w-[10%]">{{ product.size.join(", ") }}</td>
                <td class="w-[10%]">{{ product.color.join(", ") }}</td>
                <td class="w-[10%]">{{ product.brand_name }}</td>
                <td class="w-[10%]">{{ product.category_name }}</td>
                <td class="w-[10%]">{{ product.sub_category_name }}</td>
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