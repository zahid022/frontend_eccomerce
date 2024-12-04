<script setup lang="ts">
import { editProduct } from '@/stores/admin/product/sidebar/editProduct';
import { storeToRefs } from 'pinia';
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { confirmProduct } from '@/stores/admin/product/modal/confirmProduct';
import { watch } from 'vue';
import api from '@/services/api';

const idStore = confirmProduct()

const { confirmProductId } = storeToRefs(idStore)

const store = editProduct()

const { editProductFlag } = storeToRefs(store)

const { SET_EDIT_PRODUCT_FLAG } = store

watch(() => editProductFlag.value, async () => {
    if(editProductFlag.value){
        let response = await api.getProductId(confirmProductId.value)
        console.log(response)
    }
})

</script>

<template>
    <div :class="{ 'visible duration-300': editProductFlag, 'invisible duration-300': !editProductFlag }"
        class="fixed bg-[#00000080] z-50 inset-0 flex justify-end">
        <div @click="() => SET_EDIT_PRODUCT_FLAG(false)"
            :class="{ 'opacity-100 w-8/12': editProductFlag, 'opacity-0 w-full': !editProductFlag }"
            class="duration-300 bg-[#00000080]">
        </div>
        <div :class="{ 'translate-x-[300%]': !editProductFlag, 'translate-x-0': editProductFlag }"
            class="w-4/12 h-screen duration-300 px-6 py-8 bg-gray-700">
            <div class="flex items-center mb-6 justify-end">
                <button @click="() => SET_EDIT_PRODUCT_FLAG(false)">
                    <XMarkIcon class="w-8 h-8 text-white" />
                </button>
            </div>
            <div>
                <div class="mb-6">
                    <label for="name">Product name</label>
                    <input type="text" name="name" />
                </div>
                <div class="mb-6">
                    <label for="price">Product price</label>
                    <input type="number" name="price" />
                </div>
                <div class="mb-6">
                    <label for="discount">Product Discount</label>
                    <input type="number" name="discount" />
                </div>
                <div class="mb-6">
                    <label for="stock">Product Stock</label>
                    <input type="number" name="stock" />
                </div>
                <div class="mb-6">
                    <label for="stock">Product Description</label>
                    <textarea type="number" rows="4" name="stock"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
    color: #fff;
}
input {
    display: block;
    outline: none;
    border-radius: 5px;
    padding: 10px 21px;
    width: 100%;
}
textarea{
    display: block;
    border-radius: 5px;
    width: 100%;
    outline: none;
    padding: 8px;
}
</style>