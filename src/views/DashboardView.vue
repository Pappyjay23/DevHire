<script setup>
import HeroBg from '@/assets/job-bg-2.jpg'
</script>

<template>
  <section
    class="bg-[#127780] bg-fixed bg-cover bg-center relative z-10 min-h-screen w-full p-5"
    :style="{ backgroundImage: `url(${HeroBg})` }"
  >
    <div class="bg-[#000] absolute top-0 left-0 w-full min-h-screen h-full opacity-50 -z-20"></div>
    <h1 class="mb-5 text-3xl text-white font-bold text-center">Dashboard</h1>
  </section>
</template>

<style></style>
