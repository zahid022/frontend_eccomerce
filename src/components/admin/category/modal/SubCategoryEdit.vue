<script setup lang="ts">
import api from '@/services/api';
import { subCategory } from '@/stores/admin/category/modal/subCategory';
import type { subcategory } from '@/types/dbType';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';
import { ref, type Ref } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast()
const store = subCategory()
const editname: Ref<string> = ref('')

const { subCategoryEditFlag, subCategoryName, categoryId, subCategoryId, fetchingFlag } = storeToRefs(store)

const { SET_SUB_CATEGORY_EDIT_FLAG, SET_FETCHING_FLAG } = store

const handleEdit = async () => {
    if (!editname.value) {
        toast.error("Sub-Category name is required")
        return
    }

    let obj: Partial<subcategory> = {
        category_id: categoryId.value,
        name: editname.value
    }

    let slug_name = editname.value.trim().replace(/\s+/g, '-').toLowerCase();
    obj.slug = slug_name

    let response = await api.updateSubCategory(obj, subCategoryId.value)

    if (!response) {
        toast.error("Sub_category updated failed")
        return
    }

    toast.success(`${response.message}`)
    SET_SUB_CATEGORY_EDIT_FLAG(false)
    SET_FETCHING_FLAG(!fetchingFlag.value)
}
</script>

<template>
    <div :class="{ 'opacity-0 invisible': !subCategoryEditFlag, 'opacity-100 visible': subCategoryEditFlag }"
        class="fixed duration-300 inset-0 flex items-start justify-center bg-[#00000080]">
        <div class="bg-gray-700 max-w-xl w-full px-4 py-6 rounded-ee-md duration-300 rounded-es-md"
            :class="{ '-translate-y-[300%]': !subCategoryEditFlag, 'translate-y-0': subCategoryEditFlag }">
            <div class="flex flex-wrap justify-end">
                <button @click="() => SET_SUB_CATEGORY_EDIT_FLAG(false)">
                    <XMarkIcon class="w-6 h-6 text-white" />
                </button>
                <div class="w-full pt-6 flex justify-between items-end">
                    <div>
                        <label class="block text-white mb-1 font-medium" for="name">Sub-Category name</label>
                        <input v-model="editname" name="name" class="w-80 outline-none rounded-md py-3 px-6"
                            :placeholder="subCategoryName" type="text">
                    </div>
                    <button @click="handleEdit" class="bg-lime-700 text-white rounded-md py-3 px-6">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>