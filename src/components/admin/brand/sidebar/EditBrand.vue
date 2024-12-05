<script setup lang="ts">
import api from '@/services/api';
import { editBrand } from '@/stores/admin/brand/sidebar/editBrand';
import type { brand } from '@/types/dbType';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast()

const store = editBrand()

const { SET_EDIT_FLAG, SET_EDIT_BRAND_NAME } = store

const { brandId, editFlag, brandName } = storeToRefs(store)

const placeholderValue = ref('')

const getBrand = async () => {
    if (brandId.value) {
        let response = await api.getBrandId(brandId.value)
        placeholderValue.value = response.name
    }
}

onMounted(() => getBrand())
watch(() => brandId.value, () => getBrand())

const handleChangeBrandName = (event: any) => {
    SET_EDIT_BRAND_NAME(event.target.value)
}

const handleSubmit = async () => {
    if (brandName.value.trim().length === 0) {
        toast.error("Brand name is required")
        return
    }

    let roleLocal = localStorage.getItem("role")
    let role = roleLocal ? JSON.parse(roleLocal) : ''

    if(role !== "admin") {
        toast.error("You are not an ADMIN")
        SET_EDIT_FLAG(false)
        return
    }

    let obj: Partial<brand> = {}
    obj.name = brandName.value

    let slug_name = brandName.value.trim().replace(/\s+/g, '-').toLowerCase();
    obj.slug = slug_name
    let response = await api.updateBrand(obj, brandId.value)
    
    if(!response){
        toast.error("Brand's update failed")
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
                    <label for="brand_name">Brand name</label>
                    <input @input="handleChangeBrandName" :placeholder="placeholderValue.toUpperCase()" type="text"
                        name="brand_name">
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