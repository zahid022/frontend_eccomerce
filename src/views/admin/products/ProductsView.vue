<template>
    <div>
        <div>
            <span>#</span>
            <span>Name</span>
            <span>Description</span>
            <span>Stock</span>
            <span>Price</span>
            <span>Discount</span>
            <span>Size</span>
            <span>Color</span>
            
        </div>
        <div></div>
    </div>
</template>

<script setup lang="ts">
import api from '@/services/api';
import { ref, onMounted } from 'vue';

const data = ref([]);

onMounted(async () => {
    try {
        const response = await api.getProducts();
        console.log(response)
        data.value = response;
    } catch (error) {
        console.error("Error fetching products:", error);
    }
});
</script>