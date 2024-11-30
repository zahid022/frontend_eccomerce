<script setup lang="ts">
import { confirmProduct } from '@/stores/admin/product/modal/confirmProduct';
import { storeToRefs } from 'pinia';
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue';
import api from '@/services/api';
import { editProduct } from '@/stores/admin/product/sidebar/editProduct';
import { useToast } from 'vue-toastification';

const toast = useToast()

// state

const deleteFlag = ref<boolean>(false)

// store 
const store = confirmProduct()

const { confirmFlag, confirmProductId, confirmProductName } = storeToRefs(store)
const { SET_CONFIRM_FLAG } = store

const store1 = editProduct()

const {SET_EDIT_PRODUCT_FLAG} = store1


// methods
const handleClose = () => {
    SET_CONFIRM_FLAG(false)
    deleteFlag.value = false
}

const handleDeleteProduct = async () => {
    let result = await api.deleteProduct(confirmProductId.value)
    if(result){
        SET_CONFIRM_FLAG(false)
        toast.success("Product is deleted successfully")
    }else{
        toast.error("Product deleted is failed")
    }
}

const handleEditProduct = () =>{
    SET_EDIT_PRODUCT_FLAG(true)
    SET_CONFIRM_FLAG(false)
}

</script>

<template>
    <div class="fixed inset-0 bg-[#00000080] flex justify-center items-center duration-300"
        :class="{ 'opacity-100 visible': confirmFlag, 'opacity-0 invisible': !confirmFlag }">
        <div class="max-w-lg bg-gray-700 w-full duration-300 py-3 px-4 rounded-md"
            :class="{ 'translate-y-0': confirmFlag, '-translate-y-12': !confirmFlag }">

            <div class="flex justify-between mb-4 items-center border-b border-white text-white pb-2">
                <p class="text-[18px] font-medium"><b class="font-semibold">Product Name :</b> {{ confirmProductName }}
                </p>
                <button @click="handleClose">
                    <XMarkIcon class="w-6 h-6" />
                </button>
            </div>

            <div class="flex justify-between flex-wrap" :class="{'py-4' : !deleteFlag}">

                <template v-if="deleteFlag">
                    <p class="w-full mb-4 text-[1.5em] text-white font-medium text-center">Are you sure?</p>
                    <div class="w-5/12">
                        <button @click="() => deleteFlag = false" class="bg-red-700 block w-full py-3 rounded-md font-medium text-white">No</button>
                    </div>
                    <div class="w-5/12">
                        <button @click="handleDeleteProduct" class="bg-lime-700 block w-full py-3 rounded-md font-medium text-white">Yes</button>
                    </div>
                </template>

                <template v-else>
                    <div class="w-5/12">
                        <button @click="handleEditProduct" class="bg-lime-700 block w-full py-3 rounded-md font-medium text-white">Edit</button>
                    </div>
                    <div @click="() => deleteFlag = true" class="w-5/12">
                        <button class="bg-red-700 block w-full py-3 rounded-md font-medium text-white">Delete</button>
                    </div>
                </template>

            </div>
        </div>
    </div>
</template>