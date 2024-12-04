<script setup lang="ts">
import TileCard from '../tileCard/TileCard.vue';
import TileShirt from "@/assets/img/public/tile_dress-shirts.jpg"
import TileSuit from "@/assets/img/public/tile_suits.jpg"

export interface tileSlider {
    image: string,
    name: string
}

const data: tileSlider[] = [
    {
        image: TileShirt,
        name: "Dress Shirts",
    },
    {
        image: TileSuit,
        name: "Men's Suits",
    }
]

</script>

<template>
    <section class="py-10">
        <div class="wrapper">
            <div class="flex flex-wrap">

                <template v-if="data.length > 0">
                    <div v-for="(sliderData, index) in data" :key="index"
                        class="w-full mb-4 md:px-1 md:mb-0 md:w-6/12">
                        <TileCard :data="sliderData" />
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>