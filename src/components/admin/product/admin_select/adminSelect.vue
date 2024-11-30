<script setup lang="ts">
import {  type PropType } from 'vue';

const props = defineProps({
    name: String,
    text: String,
    flag: Boolean,
    idState: [String, Number],  
    options: {
        type: Array as PropType<{ id?: string | number; name: string; slug: string }[]>,
        required: true,
        default: () => []  
    }
});

const emit = defineEmits<{
    (event: 'update:selected', value: string | number): void;
    (event: 'click'): void;
}>();

const handleChange = (event: Event) => {
    let selectedValue : string | number = (event.target as HTMLSelectElement).value;
    if(!selectedValue.includes("Choose")){
        selectedValue = Number(selectedValue)
    }
    emit('update:selected', selectedValue); 
};

const handleClick = () => {
    emit('click');
};
</script>

<template>
    <fieldset :class="flag ? 'w-[30%]' : 'w-full'">
        <label :for="name">{{ text }}</label>
        <select :name="name" :value="idState" @change="handleChange" @click="handleClick">
            <option value="Choose">Choose</option>
            <template v-if="options.length > 0">
                <option v-for="option in options" :key="option.id" :value="option.id">
                    {{ option.name.toUpperCase() }}
                </option>
            </template>
        </select>
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

select {
    display: block;
    width: 100%;
    outline: none;
    border-radius: 5px;
    padding: 8px 21px;
    font-weight: 500;
}
</style>
