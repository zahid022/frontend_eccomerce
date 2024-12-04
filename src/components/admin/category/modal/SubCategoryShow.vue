<script setup lang="ts">
import api from '@/services/api';
import { subCategory } from '@/stores/admin/category/modal/subCategory';
import type { subcategory } from '@/types/dbType';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';
import { ref, watch, type Ref } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast()

const store = subCategory()
const data: Ref<subcategory[]> = ref([])

const subCategoryName : Ref<string> = ref('')

const { categoryId, categoryName, flag ,fetchingFlag} = storeToRefs(store)

const { SET_FLAG, SET_SUB_CATEGORY_EDIT_FLAG,SET_FETCHING_FLAG, SET_SUB_CATEGORY_EDIT_NAME, SET_SUB_CATEGORY_EDIT_ID, SET_SUB_CATEGORY_DELETE_FLAG } = store

const getData = async () => {
    if(!categoryId.value) return
    let response = await api.getSubCategory(categoryId.value)
    data.value = response
}

watch(() => categoryId.value, () => getData())
watch(() => fetchingFlag.value, () => getData())

const createSubCategory = async () => {
    if(subCategoryName.value.trim().length === 0) {
        toast.error("Sub Category Name is required")
        return
    }
    let obj : Partial<subcategory> = {
        category_id : categoryId.value
    }

    obj.name = subCategoryName.value;

    let slug_name = subCategoryName.value.trim().replace(/\s+/g, '-').toLowerCase();
    obj.slug = slug_name
    
    let response = await api.addSubCategory(obj)

    if(!response){
        toast.error("Sub Category created failed")
        return
    }

    toast.success(`${response.message}`)

    subCategoryName.value = ''
    SET_FETCHING_FLAG(!fetchingFlag.value)
}

const handleEditSUbCategory = (bool : boolean, name : string, id : number) => {
    SET_SUB_CATEGORY_EDIT_FLAG(bool)
    SET_SUB_CATEGORY_EDIT_NAME(name)
    SET_SUB_CATEGORY_EDIT_ID(id)
}

const handleDeleteDubCategory = (bool : boolean, id : number) => {
    SET_SUB_CATEGORY_DELETE_FLAG(bool)
    SET_SUB_CATEGORY_EDIT_ID(id)
}

</script>

<template>
    <div :class="{ 'opacity-0 invisible': !flag, 'opacity-100 visible': flag }"
        class="fixed duration-300 inset-0 bg-[#00000080] flex justify-center items-center">
        <div :class="{ '-translate-y-12': !flag, 'translate-y-0': flag }"
            class="min-h-[500px] duration-300 rounded-md max-w-4xl w-full bg-gray-700">
            <div class="py-3 px-4 relative">
                <div>
                    <button @click="() => SET_FLAG(false)" class="absolute right-4 top-4">
                        <XMarkIcon class="w-5 h-5 text-white" />
                    </button>
                    <h2 class="text-center text-white text-2xl mb-4 font-medium">Sub-Categories</h2>
                    <div class="border-b pb-1 mb-6 border-white">
                        <p class="text-white font-medium text-[18px]">Category Name : {{ categoryName.toUpperCase() }}
                        </p>
                    </div>
                </div>
                <div id="table">
                    <p class="thead">
                        <span class="w-[10%]">#</span>
                        <span class="w-[25%]">Name</span>
                        <span class="w-[25%]">Slug</span>
                        <span class="w-[40%]">Action</span>
                    </p>
                    <div class="tbody">
                        <template v-if="data.length > 0">
                            <p v-for="(sub, index) in data" :key="sub.id">
                                <span class="w-[10%]">{{ index + 1 }}</span>
                                <span class="w-[25%]">{{ sub.name }}</span>
                                <span class="w-[25%]">{{ sub.slug }}</span>
                                <span class="w-[40%]">
                                    <div class="inline-block pr-2">
                                        <button @click="() => handleEditSUbCategory(true, sub.name, sub.id as number)" class="px-6 py-1 bg-lime-700 text-white rounded-md">Edit</button>
                                    </div>
                                    <div class="inline-block pl-2">
                                        <button @click="() => handleDeleteDubCategory(true, sub.id as number)" class="px-4 py-1 bg-red-700 text-white rounded-md">Delete</button>
                                    </div>
                                </span>
                            </p>
                        </template>
                    </div>
                </div>
                <div class="border-t border-white pt-4">
                    <div class="flex items-center justify-between">
                        <input v-model="subCategoryName" type="text" placeholder="Sub_category Name" class="outline-none py-2 px-6 rounded-md w-80">
                        <button @click="createSubCategory" class="bg-gray-800 text-white px-6 py-2 rounded-md">Add Sub-Category</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#table {
    width: 100%;
    height: 300px;
    overflow-y: auto;
}

#table::-webkit-scrollbar {
  display: none; 
}

.thead {
    cursor: default;
    background-color: #20202e;
}

#table p {
    color: #fff;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.tbody p:nth-child(even) {
    background-color: #20202e;
    color: #fff;
}
 
#table span{
    display: block;
    padding: 12px 0;
    text-align: center
}

.thead span {
    font-size: 16px;
    font-weight: 500;
}
</style>