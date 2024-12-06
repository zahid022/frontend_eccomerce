<script setup lang="ts">
import { tagsBtnsStore } from '@/stores/public/tags/tagsBtnsStore';
import TagBtns from '../tagsBtns/TagBtns.vue';
import { storeToRefs } from 'pinia';
import api from '@/services/api';
import { onMounted, ref, watch, onUnmounted, type Ref } from 'vue';
import TagProductCard from '../tagProductCard/TagProductCard.vue';
import type { product } from '@/types/dbType';

const store = tagsBtnsStore();

const data: Ref<product[]> = ref([]);
const displayedData: Ref<product[]> = ref([]);

const { tag } = storeToRefs(store);

const updateDisplayedData = () => {
  const productsToShow = window.innerWidth < 850 ? 8 : 9;
  displayedData.value = data.value.slice(0, productsToShow);
};

const handleResize = () => {
  updateDisplayedData();
};

const getData = async () => {
  const res = await api.getProducts({ tag: tag.value });
  data.value = res.data;
  updateDisplayedData(); 
};

onMounted(() => {
  getData();
  window.addEventListener('resize', handleResize);
  updateDisplayedData();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

watch(() => tag.value, () => getData());
</script>

<template>
  <section class="md:py-8">
    <div class="wrapper">
      <TagBtns />
      <div id="grid">
        <TagProductCard
          v-for="item in displayedData"
          :key="item.id"
          :item="item"
        />
        <div class="bg-[#F5F5F7] cursor-pointer flex items-center md:text-[22px] justify-center">
          All <span>→</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#grid {
  display: grid;
  padding: 40px 0 0 0;
  gap: 5px;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto;
}

@media only screen and (min-width: 850px) {
  #grid {
    gap: 10px;
    grid-template-columns: auto auto auto auto auto;
    grid-template-rows: auto auto;
  }
}
</style>
