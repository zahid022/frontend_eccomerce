<script setup lang="ts">
import api from '@/services/api';
import { editCategory } from '@/stores/admin/category/sidebar/editCategory';
import type { category } from '@/types/dbType';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast()

const store = editCategory()

const { SET_EDIT_FLAG, SET_EDIT_CATEGORY_NAME } = store

const { categoryId, editFlag, categoryName } = storeToRefs(store)
const placeholderValue = ref('')

const getCategory = async () => {
    if (categoryId.value) {
        let response = await api.getCategoryId(categoryId.value)
        placeholderValue.value = response.name
    }
}

onMounted(() => getCategory())
watch(() => categoryId.value, () => getCategory())

const handleChangeCategoryName = (event: any) => {
    SET_EDIT_CATEGORY_NAME(event.target.value)
}

const handleSubmit = async () => {
    if (categoryName.value.trim().length === 0) {
        toast.error("Category name is required")
        return
    }

    let roleLocal = localStorage.getItem("role")
    let role = roleLocal ? JSON.parse(roleLocal) : ''

    if(role !== "admin") {
        toast.error("You are not an ADMIN")
        SET_EDIT_FLAG(false)
        return
    }
    
    let obj: Partial<category> = {}
    obj.name = categoryName.value

    let slug_name = categoryName.value.trim().replace(/\s+/g, '-').toLowerCase();
    obj.slug = slug_name
    let response = await api.updateCategory(obj, categoryId.value)
    
    if(!response){
        toast.error("Category's update failed")
        return
    }
    toast.success(`${response.message}`)
    SET_EDIT_FLAG(false)
}

</script>

<template>
    <div :class="{ 'visible duration-300': editFlag, 'invisible duration-300': !editFlag }"
        class="fixed bg-[#00000080] z-50 inset-0 flex justify-end">
        <div @click="() => SET_EDIT_FLAG(false)"
            :class="{ 'opacity-100 w-8/12': editFlag, 'opacity-0 w-full': !editFlag }"
            class="duration-300 bg-[#00000080]">
        </div>
        <div :class="{ 'translate-x-[300%]': !editFlag, 'translate-x-0': editFlag }"
            class="w-4/12 h-screen duration-300 px-6 py-8 bg-gray-700">
            <div class="flex items-center mb-6 justify-end">
                <button @click="() => SET_EDIT_FLAG(false)">
                    <XMarkIcon class="w-8 text-white h-8" />
                </button>
            </div>
            <div>
                <div>
                    <label for="category_name">Category name</label>
                    <input @input="handleChangeCategoryName" :placeholder="placeholderValue.toUpperCase()" type="text"
                        name="category_name">
                </div>
            </div>
        </div>
        <div class="fixed bottom-6 right-6">
            <button @click="handleSubmit" class="text-white py-2 rounded-md bg-lime-600 px-6">Save</button>
        </div>
    </div>
</template>

<style scoped>
label {
    display: block;
    padding-left: 10px;
    font-weight: 400;
    color: #fff;
    margin-bottom: 4px;
}

input {
    outline: none;
    padding: 10px 12px;
    border-radius: 5px;
    display: block;
    width: 100%;
}
</style>