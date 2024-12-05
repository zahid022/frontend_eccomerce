<script setup lang="ts">
import api from '@/services/api';
import type { brand } from '@/types/dbType';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast()

const brand_name = ref<string>('')

const handleAddBrand = async () => {
    if (brand_name.value.trim().length === 0) {
        toast.error("Brand name is required")
        return
    }

    let roleLocal = localStorage.getItem("role")
    let role = roleLocal ? JSON.parse(roleLocal) : ''

    if(role !== "admin") {
        toast.error("You are not an ADMIN")
        return
    }


    let obj: Partial<brand> = {};
    obj.name = brand_name.value;

    let slug_name = brand_name.value.trim().replace(/\s+/g, '-').toLowerCase();
    obj.slug = slug_name

    let response = await api.addBrand(obj as brand)

    if (!response) {
        toast.error("Brand created is failed")
        return
    }

    brand_name.value = ''
    toast.success("Category is created successfully")
}
</script>

<template>
    <div>
        <h1 class="mb-4 text-white font-medium text-[2em] text-center">Add Brand</h1>
        <div class="max-w-md w-full pt-4 mx-auto">
            <input v-model="brand_name" type="text" name="brand_name" placeholder="Brand Name"
                class="block w-full outline-none p-3 rounded-md">
            <div class="flex justify-center pt-5">
                <button @click="handleAddBrand" class="px-8 py-3 rounded-md bg-gray-700 text-white">Add
                    Brand</button>
            </div>
        </div>
    </div>
</template>