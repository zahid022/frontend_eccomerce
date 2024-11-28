<script setup lang="ts">
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
    <div class="flex">
        <div class="w-[20%] fixed h-screen top-0 left-0 border-r border-zinc-400 bg-gray-900 bottom-0">
            <AdminSidebar />
        </div>
        <div class="w-[80%] relative left-[20%] bg-gray-800 min-h-screen ">
            <div id="container">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<style scoped>
    #container {
        width: 95%;
        margin: auto;
        padding: 20px 0;
    }
</style>