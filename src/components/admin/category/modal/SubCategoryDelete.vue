<script setup lang="ts">
import api from '@/services/api';
import { subCategory } from '@/stores/admin/category/modal/subCategory';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';

const toast = useToast()
const store = subCategory()

const { subCategoryDeleteFlag, subCategoryId, fetchingFlag } = storeToRefs(store)

const { SET_SUB_CATEGORY_DELETE_FLAG, SET_FETCHING_FLAG } = store

const handleDelete = async () => {
    let response = await api.deleteSubCategory(subCategoryId.value)

    if(!response) {
        toast.error("Sub category deleted failed")
        return
    }

    toast.success("Sub category is deleted successfully")

    SET_FETCHING_FLAG(!fetchingFlag.value)
    SET_SUB_CATEGORY_DELETE_FLAG(false)

}


</script>

<template>
    <div :class="{ 'opacity-0 invisible': !subCategoryDeleteFlag, 'opacity-100 visible': subCategoryDeleteFlag }"
        class="fixed duration-300 inset-0 flex items-start justify-center bg-[#00000080]">
        <div class="bg-gray-700 max-w-xl w-full px-4 py-6 rounded-ee-md duration-300 rounded-es-md"
            :class="{ '-translate-y-[300%]': !subCategoryDeleteFlag, 'translate-y-0': subCategoryDeleteFlag }">
            <div class="flex flex-wrap mb-6 justify-end">
                <button @click="() => SET_SUB_CATEGORY_DELETE_FLAG(false)">
                    <XMarkIcon class="w-6 h-6 text-white" />
                </button>
            </div>
            <div>
                <h2 class="text-center text-white text-xl mb-4">Are you sure ?</h2>
                <div class="flex justify-between">
                    <button @click="() => SET_SUB_CATEGORY_DELETE_FLAG(false)" class="block w-5/12 bg-red-700 text-white rounded-md py-3">No</button>
                    <button @click="handleDelete" class="block w-5/12 bg-lime-700 text-white rounded-md py-3">Yes</button>
                </div>
            </div>
        </div>
    </div>
</template>