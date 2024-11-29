<script setup lang="ts">
import { addProduct } from '@/stores/admin/product/add_product/addProduct';

const props = defineProps<{
    name : string,
    text : string,
    type : string,
    flag : boolean,
    state : string
}>()

const store = addProduct()

const {SET_NAME,  SET_DISCOUNT, SET_PRICE, SET_STOCK} = store

const handleChange = (event: Event) => {
    let selectedValue : string | number = (event.target as HTMLInputElement).value;
    if(props.state === "name") SET_NAME(selectedValue)
    if(props.state === "price") SET_PRICE(selectedValue)
    if(props.state === "discount") SET_DISCOUNT(selectedValue)
    if(props.state === "stock") SET_STOCK(selectedValue)
};
</script>

<template>
    <fieldset :class="flag ? 'w-[30%]' : 'w-full'">
        <label :for="name">{{ text }}</label>
        <input :type="type" @input="handleChange" :name="name" />
    </fieldset>
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

input {
    display: block;
    width: 100%;
    outline: none;
    border-radius: 5px;
    padding: 8px 21px;
    font-weight: 500;
}
</style>