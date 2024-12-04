<script setup lang="ts">
import ConfirmDelete from '@/components/admin/category/modal/ConfirmDelete.vue';
import SubCategoryDelete from '@/components/admin/category/modal/SubCategoryDelete.vue';
import SubCategoryEdit from '@/components/admin/category/modal/SubCategoryEdit.vue';
import SubCategoryShow from '@/components/admin/category/modal/SubCategoryShow.vue';
import EditCategory from '@/components/admin/category/sidebar/EditCategory.vue';
import api from '@/services/api';
import { confirmCategory } from '@/stores/admin/category/modal/confirmCategory';
import { subCategory } from '@/stores/admin/category/modal/subCategory';
import { editCategory } from '@/stores/admin/category/sidebar/editCategory';
import type { category } from '@/types/dbType';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';

const data = ref<category[]>([])

const store = confirmCategory()

const {confirmFlag} = storeToRefs(store)

const {SET_CONFIRM_FLAG, SET_CATEGORY_ID, SET_CATEGORY_NAME} = store

const editStore = editCategory()

const {editFlag} = storeToRefs(editStore)

const {SET_EDIT_CATEGORY_ID, SET_EDIT_FLAG} = editStore

const subStore = subCategory()

const {SET_S_CATEGORY_ID, SET_S_CATEGORY_NAME, SET_FLAG} = subStore

const getCategory = async () => {
    try {
        const response = await api.getCategory();
        data.value = response;
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

onMounted(() => getCategory());

watch(() => confirmFlag.value, () => getCategory())
watch(() => editFlag.value, () => getCategory())

const handleDelete = (bool : boolean, name : string, id : number) => {
    SET_CATEGORY_ID(id)
    SET_CATEGORY_NAME(name)
    SET_CONFIRM_FLAG(bool)
}

const handleEdit = (bool : boolean, id : number) => {
    SET_EDIT_CATEGORY_ID(id)
    SET_EDIT_FLAG(bool)
}

const showSubCategory = (bool : boolean, name : string, id : number) => {
    SET_S_CATEGORY_ID(id)
    SET_S_CATEGORY_NAME(name)
    SET_FLAG(bool)
}
</script>

<template>
    <ConfirmDelete />
    <EditCategory />
    <SubCategoryShow />
    <SubCategoryEdit />
    <SubCategoryDelete />
    <h1 class="mb-4 text-white font-medium text-[2em] text-center">Categories</h1>
    <table>
        <thead>
            <tr>
                <th class="w-[10%]">#</th>
                <th class="w-[30%]">Name</th>
                <th class="w-[25%]">Slug</th>
                <th class="w-[35%]">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(category, index) in data" :key="category.id">
                <td class="w-[10%]">{{ index + 1 }}</td>
                <td class="w-[30%]">{{ category.name }}</td>
                <td class="w-[25%]">{{ category.slug }}</td>
                <td class="w-[35%]">
                    <div class="flex justify-around items-center">
                        <button @click="() => showSubCategory(true, category.name, category.id as number)" class="block w-[30%] py-2 bg-black text-white rounded-md font-medium">Sub Category</button>
                        <button @click="() => handleEdit(true, category.id as number)" class="block w-[30%] py-2 bg-lime-700 text-white rounded-md font-medium">Edit</button>
                        <button @click="() => handleDelete(true, category.name, category.id as number)" class="block w-[30%] py-2 bg-red-700 text-white rounded-md font-medium">Delete</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
table {
    width: 100%;
}

thead tr:nth-child(1) {
    cursor: default;
    background-color: #20202e;
}

tr {
    color: #fff;
    cursor: pointer;
}

tr:nth-child(even) {
    background-color: #20202e;
    color: #fff;
}

td {
    padding: 12px 0;
    text-align: center
}

th {
    padding: 12px 0;
    font-size: 16px;
    font-weight: 500;
}
</style>