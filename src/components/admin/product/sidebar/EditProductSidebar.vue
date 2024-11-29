<script setup lang="ts">
import { editProduct } from '@/stores/admin/product/sidebar/editProduct';
import { storeToRefs } from 'pinia';
import { XMarkIcon } from '@heroicons/vue/24/outline'


const store = editProduct()

const { editProductFlag } = storeToRefs(store)

const { SET_EDIT_PRODUCT_FLAG } = store

</script>

<template>
    <div :class="{ 'visible duration-300': editProductFlag, 'invisible duration-300': !editProductFlag }" class="fixed bg-[#00000080] z-50 inset-0 flex justify-end">
        <div @click="() => SET_EDIT_PRODUCT_FLAG(false)" :class="{ 'opacity-100 w-8/12': editProductFlag, 'opacity-0 w-full': !editProductFlag }"
            class="duration-300 bg-[#00000080]">
        </div>
        <div
        :class="{'translate-x-[300%]' : !editProductFlag, 'translate-x-0' : editProductFlag}"
        class="w-4/12 h-screen duration-300 px-6 py-8 bg-white">
            <div class="flex items-center mb-6 justify-end">
                <button @click="() => SET_EDIT_PRODUCT_FLAG(false)">
                    <XMarkIcon class="w-8 h-8" />
                </button>
            </div>
            <div>
                Coming soon...
            </div>
        </div>
    </div>
</template>