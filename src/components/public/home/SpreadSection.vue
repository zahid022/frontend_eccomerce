<script setup lang="ts">
import img from '@/assets/img/public/stockholm.jpg'
import img1 from '@/assets/img/public/stockholm1.jpg'
</script>

<template>
    <section class="py-5">
        <div class="wrapper">
            <div class="flex flex-wrap">

                <div class="md:w-6/12 md:pr-1 mb-4 md:mb-0 w-full relative">
                    <div>
                        <img class="w-full" :src="img" alt="Image">
                    </div>
                    <div
                        class="absolute gap-3 top-[50%] flex items-center justify-center left-0 right-0 -translate-y-[50%] z-10">
                        <span style="backdrop-filter: blur(10px);"
                            class="text-[13px] text-white border border-white p-2">Lookbook</span>
                        <p class="md:text-[42px] text-[22px] text-white">Stockholm II</p>
                    </div>
                </div>

                <div class="md:w-6/12 md:pl-1 w-full">
                    <div class="p-[10%] bg-[#2B302E] h-full flex flex-col items-center justify-center">
                        <div>
                            <img :src="img1" class="w-full" alt="Image">
                        </div>
                        <div class="flex justify-between items-center w-full pt-1 text-[14px] text-white">
                            <p>F/W 24 · Part 2</p>
                            <p class="underline cursor-pointer">Shop the Lookbook</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>