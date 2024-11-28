<script setup lang="ts">
import type { adminSidebarData } from '@/types/sidebar';
import AdminSideList from './AdminSideList.vue';

const data : adminSidebarData[] = [
    {
        name: "Brand",
        items: [
            { name: "Show Brand", path: "/admin/brand" },
            { name: "Add Brand", path: "/admin/add/brand" }
        ]
    },
    {
        name: "Category",
        items: [
            { name: "Show Category", path: "/admin/category" },
            { name: "Add Category", path: "/admin/add/category" }
        ]
    },
    {
        name: "Product",
        items: [
            { name: "Show Product", path: "/admin" },
            { name: "Add Product", path: "/admin/add/product" }
        ]
    }
]

</script>

<template>
    <div class="px-3 py-5">
        <div class="flex justify-center">
            <div class="w-[200px]">
                <img class="w-full" src="../../../assets/img/admin/admin_logo.svg" alt="">
            </div>
        </div>
        <div>
            <ul class="text-white pt-8">
                <AdminSideList v-for="(item, index) in data" :item="item" :key="index" />
            </ul>
        </div>
    </div>
</template>

<style scoped>
img {
    filter: brightness(100);
}
</style>