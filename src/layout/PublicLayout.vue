<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from '@/components/public/layout/Header.vue';
import Footer from '@/components/public/layout/Footer.vue';


</script>

<template>
    <Header />
    <main>
        <RouterView />
    </main>
    <Footer />
</template>