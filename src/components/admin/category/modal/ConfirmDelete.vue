<script setup lang="ts">
import api from '@/services/api';
import { confirmCategory } from '@/stores/admin/category/modal/confirmCategory';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';

const store = confirmCategory()
const toast = useToast()

const { confirmFlag, categoryName, categoryId } = storeToRefs(store)

const { SET_CONFIRM_FLAG } = store

const handleDeleteCategory = async () => {
    let response = await api.deleteCategory(categoryId.value)

    if(!response){
        toast.error("Category is deleted failed")
        return
    }

    toast.success(`${response.message}`)

    SET_CONFIRM_FLAG(false)
}

</script>

<template>
    <div :class="{ 'visible': confirmFlag, 'invisible': !confirmFlag }"
        class="fixed duration-300 inset-0 flex items-center justify-center bg-[#00000080]">
        <div class="max-w-lg bg-gray-700 w-full duration-300 py-3 px-4 rounded-md"
            :class="{ 'translate-y-0 opacity-100': confirmFlag, '-translate-y-12 opacity-0': !confirmFlag }">

            <div class="flex justify-between mb-4 items-center border-b border-white text-white pb-2">
                <p class="text-[18px] font-medium"><b class="font-semibold">Category Name :</b> {{ categoryName }}
                </p>
                <button @click="() => SET_CONFIRM_FLAG(false)">
                    <XMarkIcon class="w-6 h-6" />
                </button>
            </div>


            <div class="flex justify-between flex-wrap">
                <p class="w-full mb-4 text-[1.5em] text-white font-medium text-center">Are you sure?</p>
                <div class="w-5/12">
                    <button @click="() => SET_CONFIRM_FLAG(false)"
                        class="bg-red-700 block w-full py-3 rounded-md font-medium text-white">No</button>
                </div>
                <div @click="handleDeleteCategory" class="w-5/12">
                    <button class="bg-lime-700 block w-full py-3 rounded-md font-medium text-white">Yes</button>
                </div>
            </div>



        </div>
    </div>
</template>