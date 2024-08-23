<script setup>
import HeroBg from '@/assets/hero-bg.jpg'

defineProps({
  title: String,
  description: String
})
</script>

<template>
  <section
    class="flex justify-center items-center bg-fixed bg-cover bg-center h-[50vh] text-white relative"
    :style="{ backgroundImage: `url(${HeroBg})` }"
  >
    <div class="text-center flex flex-col gap-3 w-[50%] z-20">
      <h1 class="text-5xl font-semibold">{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
    <div class="bg-[#000] absolute top-0 left-0 w-full h-[50vh] opacity-50"></div>
  </section>
</template>

<style></style>
