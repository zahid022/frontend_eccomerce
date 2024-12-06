<script setup lang="ts">
import { Colors, Size, Tags } from '@/enum/enum';
import api from '@/services/api';
import type { brand, category } from '@/types/dbType';
import { CloudIcon } from '@heroicons/vue/24/outline';
import { ref, watch } from 'vue';
import AdminInput from '../../../components/admin/product/admin_input/adminInput.vue';
import AdminSelect from '../../../components/admin/product/admin_select/adminSelect.vue';
import { addProduct } from '@/stores/admin/product/add_product/addProduct';
import { storeToRefs } from 'pinia';
import { MinusIcon } from '@heroicons/vue/24/outline';
import { useToast } from 'vue-toastification';

const toast = useToast()

// choose size and color 
const size = Size
const color = Colors
const tag = Tags

const sizeFlag = ref(false)
const colorFlag = ref(false)
const tagFlag = ref(false)
const selectedSizes = ref<string[]>([]);
const selectedColors = ref<string[]>([]);
const selectedTags = ref<string[]>([]);

const handleOpenAndBlurSelect = (arg: boolean) => { sizeFlag.value = arg }
const handleOpenAndBlurSelectColor = (arg: boolean) => { colorFlag.value = arg }
const handleOpenAndBlurSelectTags = (arg: boolean) => { tagFlag.value = arg }

const handleSelection = (event: Event) => {
    const selectedOptions = (event.target as HTMLSelectElement).selectedOptions;
    selectedSizes.value = Array.from(selectedOptions).map((option) => option.value.toLowerCase());
};

const handleSelectionC = (event: Event) => {
    const selectedOptions = (event.target as HTMLSelectElement).selectedOptions;
    selectedColors.value = Array.from(selectedOptions).map((option) => option.value.toLowerCase());
};

const handleSelectionTags = (event: Event) => {
    const selectedOptions = (event.target as HTMLSelectElement).selectedOptions;
    selectedTags.value = Array.from(selectedOptions).map((option) => option.value.toLowerCase());
};
// -------------


// choose brand 
const brandArr = ref<brand[] | []>([])

const brandId = ref<number | string>("Choose Brand")

const chooseBrandId = async () => {
    if (brandArr.value.length > 0) return
    const result = await api.getBrand()
    brandArr.value = result
}
// -----------

// choose category 

const categoryArr = ref<category[] | []>([])

const categoryId = ref<number | string>("Choose Category")

const chooseCategoryId = async () => {
    if (categoryArr.value.length > 0) return
    const result = await api.getCategory()
    categoryArr.value = result
}

// ------------

// choose Subcategory 

const sub_categoryArr = ref<category[] | []>([])

const sub_categoryId = ref<number | string>("Choose Category")

watch(() => categoryId.value,
    async () => {
        if (categoryId.value === 'Choose') return
        let res = await api.getSubCategory(String(categoryId.value))
        sub_categoryArr.value = res
    })
// ----------


// pinia 
const store = addProduct()

const { description, discount, name, price, stock } = storeToRefs(store)

// ----------

// image upload 

const images = ref<string[]>([])

const handleImageUpload = async (event: Event) => {
    let roleLocal = localStorage.getItem("role")
    let role = roleLocal ? JSON.parse(roleLocal) : ''

    if (role !== "admin") {
        toast.error("You are not an ADMIN")
        return
    }
    const formData = new FormData()
    const input = event.target as HTMLInputElement;
    if (input.files) {
        formData.append("image", input.files[0])
        try {
            let result = await api.uploadImage(formData)

            images.value.push(result.url)
        } catch {
            return
        }
    }
};

const removeImage = (index: number) => {
    images.value.splice(index, 1)
}

// ----------

// add product 

const handleAddProduct = async () => {
    let roleLocal = localStorage.getItem("role")
    let role = roleLocal ? JSON.parse(roleLocal) : ''

    if (role !== "admin") {
        toast.error("You are not an ADMIN")
        return
    }

    console.log(discount)

    let obj = {
        name: name.value,
        price: price.value,
        discount: discount.value || 0,
        description: description.value,
        stock: stock.value,
        category_id: categoryId.value,
        sub_category_id: sub_categoryId.value,
        img: images.value,
        brand_id: brandId.value,
        size: selectedSizes.value,
        color: selectedColors.value,
        tags : selectedTags.value
    }
    let response = await api.addProduct(obj)

    if (!response) {
        toast.error("Product created is failed")
        return
    }
    toast.success(`${response.message}`)
}

// ------------

</script>

<template>
    <div class="flex justify-between">
        <div class="bg-gray-900 w-8/12 border border-white rounded-md py-4 px-8">
            <div class="flex justify-between mb-8">
                <AdminInput :state="'name'" :flag="true" :name="'name'" :type="'text'" :text="'Product Name *'" />
                <AdminInput :state="'price'" :flag="true" :name="'price'" :type="'number'" :text="'Product Price *'" />
                <AdminInput :state="'discount'" :flag="true" :name="'discount'" :type="'number'"
                    :text="'Product Discount'" />
            </div>
            <div class="flex justify-between mb-6">
                <AdminSelect :flag="true" :id-state="brandId" :name="'brand'" :text="'Choose Brand *'"
                    :options="brandArr" @update:selected="brandId = $event" @click="chooseBrandId" />


                <AdminSelect :flag="true" @update:selected="categoryId = $event" @click="chooseCategoryId"
                    :id-state="categoryId" :name="'Catgeory'" :options="categoryArr" :text="'Product Category *'" />


                <AdminSelect :flag="true" :id-state="sub_categoryId" :options="sub_categoryArr"
                    @update:selected="sub_categoryId = $event" :name="'sub'" :text="'Product Sub-Category *'" />
            </div>
            <div class="mb-6">
                <label for="description">Product Description *</label>
                <textarea name="description" v-model="description" rows="3"></textarea>
            </div>
            <div class="flex relative h-[300px] border border-dashed rounded-md justify-between">
                <div class="absolute inset-0 flex flex-col justify-center items-center">
                    <CloudIcon class="w-16 text-white" />
                    <span class="text-white text-[22px] font-medium">Upload Image</span>
                </div>
                <input @input="handleImageUpload" class="absolute inset-0 cursor-pointer bg-red-200 opacity-0"
                    type="file">
            </div>
        </div>
        <div class="bg-gray-900 w-[30%] border relative border-white rounded-md py-4 px-8">
            <div class="mb-8">
                <AdminInput :state="'stock'" :flag="false" :name="'stock'" :type="'number'" :text="'Product Stock *'" />
            </div>
            <div class="mb-8">
                <label>Product Image *</label>
                <div v-if="images.length > 0" class="flex flex-wrap gap-4">
                    <div class="pt-3 relative rounded-sm overflow-hidden" v-for="(img, index) in images" :key="index">
                        <button @click="() => removeImage(index)"
                            class="bg-red-600 absolute right-0 top-[1px] text-white rounded-full w-5 h-5 flex justify-center items-center text-[1.5em]">
                            <MinusIcon />
                        </button>
                        <img class="w-20 h-12 object-cover rounded-sm" :src="img" alt="">
                    </div>
                </div>
                <div v-else class="text-white py-5 border-b border-white">
                    <p>There is no image!</p>
                </div>
            </div>
            <div class="mb-12">
                <div>
                    <label for="size">Product Size *</label>
                    <select @click="() => handleOpenAndBlurSelect(true)" @change="handleSelection"
                        @blur="() => handleOpenAndBlurSelect(false)" name="size" :multiple="sizeFlag" id="sizeSelect">
                        <option value="">Choose Size</option>
                        <option :value="s" v-for="s in size" :key="s">{{ s }}</option>
                    </select>
                </div>
                <div v-if="selectedSizes.length > 0">
                    <span class="text-white inline-block pr-2 underline py-1" v-for="size in selectedSizes"
                        :key="size">{{ size }}</span>
                </div>
            </div>
            <div class="mb-12">
                <div>
                    <label for="tags">Product Tags *</label>
                    <select @click="() => handleOpenAndBlurSelectTags(true)" @change="handleSelectionTags"
                        @blur="() => handleOpenAndBlurSelectTags(false)" name="tags" :multiple="tagFlag" id="sizeSelect">
                        <option value="">Choose Tag</option>
                        <option :value="t" v-for="t in tag" :key="t">{{ t }}</option>
                    </select>
                </div>
                <div v-if="selectedTags.length > 0">
                    <span class="text-white inline-block pr-2 underline py-1" v-for="tags in selectedTags"
                        :key="tags">{{ tags }}</span>
                </div>
            </div>
            <div class="mb-12">
                <div>
                    <label for="size">Product Color *</label>
                    <select @click="() => handleOpenAndBlurSelectColor(true)" @change="handleSelectionC"
                        @blur="() => handleOpenAndBlurSelectColor(false)" name="size" :multiple="colorFlag"
                        id="sizeSelect">
                        <option value="">Choose Color</option>
                        <option :value="c" v-for="c in color" :key="c">{{ c.toUpperCase() }}</option>
                    </select>
                </div>
                <div v-if="selectedColors.length > 0">
                    <span class="text-white inline-block pr-2 underline py-1" v-for="color in selectedColors"
                        :key="color">{{ color }}</span>
                </div>
            </div>
            <div>
                <button @click="handleAddProduct"
                    class="w-full block py-3 bg-gray-700 hover:bg-gray-500 font-medium duration-300 text-white rounded-md">Add
                    Product</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
label {
    display: block;
    color: #fff;
    font-weight: 600;
    margin-bottom: 2px;
    padding-left: 6px;
    font-size: 14px;
}

input,
select,
textarea {
    display: block;
    width: 100%;
    outline: none;
    border-radius: 5px;
    padding: 8px 21px;
    font-weight: 500;
}

textarea {
    background: transparent;
    border: 1px solid #fff;
    color: #fff;
}

#sizeSelect {
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
}

#sizeSelect option {
    background-color: transparent;
    padding: 4px 0;
    border-bottom: 1px solid #fff;
}
</style>