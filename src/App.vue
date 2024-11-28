<script setup lang="ts">
import { shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import PublicLayout from './layout/PublicLayout.vue';
import AdminLayout from './layout/AdminLayout.vue';
import AdminLogin from './views/admin/login/AdminLogin.vue';

const layout = shallowRef(PublicLayout);
const route = useRoute();

watch(
  () => route.meta.layout,
  (value) => {
    switch (value) {
      case 'PublicLayout':
        layout.value = PublicLayout;
        break;
      case 'AdminLayout':
        layout.value = AdminLayout;
        break;
      default:
        layout.value = AdminLogin;
        break;
    }
  },
  { immediate: true }
);
</script>

<template>
  <component :is="layout" />
</template>
