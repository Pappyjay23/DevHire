<script setup>
import HeroBg from '@/assets/job-bg.jpg'

defineProps({
  title: String,
  description: String
})
</script>

<template>
  <section
    class="flex justify-center items-center bg-fixed bg-cover bg-center h-[60vh] lg:h-[50vh] text-white relative"
    :style="{ backgroundImage: `url(${HeroBg})` }"
  >
    <div class="text-center flex flex-col gap-3 px-4 md:w-[70%] lg:w-[50%] z-10">
      <h1 class="text-[2rem] lg:text-5xl font-semibold">{{ title }}</h1>
      <p class="text-[80%] lg:text-base tracking-wide">{{ description }}</p>
    </div>
    <div class="bg-[#000] absolute top-0 left-0 w-full h-[60vh] lg:h-[50vh] opacity-60"></div>
  </section>
</template>

<style></style>
