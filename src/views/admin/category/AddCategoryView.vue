<script setup lang="ts">
import api from '@/services/api';
import type { category } from '@/types/dbType';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast()

const category_name = ref<string>('')

const handleAddCategory = async () => {
    if (category_name.value.trim().length === 0) {
        toast.error("Category Name is required")
        return
    }

    let roleLocal = localStorage.getItem("role")
    let role = roleLocal ? JSON.parse(roleLocal) : ''

    if(role !== "admin") {
        toast.error("You are not an ADMIN")
        return
    }

    let obj: Partial<category> = {};
    obj.name = category_name.value;

    let slug_name = category_name.value.trim().replace(/\s+/g, '-').toLowerCase();
    obj.slug = slug_name

    let response = await api.addCategory(obj as category)

    if (!response) {
        toast.error("Category created is failed")
        return
    }

    category_name.value = ''
    toast.success("Category is created successfully")
}
</script>

<template>
    <div>
        <h1 class="mb-4 text-white font-medium text-[2em] text-center">Add Category</h1>
        <div class="max-w-md w-full pt-4 mx-auto">
            <input v-model="category_name" type="text" name="category_name" placeholder="Category Name"
                class="block w-full outline-none p-3 rounded-md">
            <div class="flex justify-center pt-5">
                <button @click="handleAddCategory" class="px-8 py-3 rounded-md bg-gray-700 text-white">Add
                    Category</button>
            </div>
        </div>
    </div>
</template>