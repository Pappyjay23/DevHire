<script setup>
import JobForm from '@/components/JobForm.vue'
import HeroBg from '@/assets/job-bg.jpg'
</script>

<template>
  <div
    class="bg-[#127780] bg-fixed bg-cover bg-center relative z-10 min-h-screen w-full p-5"
    :style="{ backgroundImage: `url(${HeroBg})` }"
  >
    <div class="bg-[#000] absolute top-0 left-0 w-full h-full opacity-50 -z-20"></div>
    <JobForm />
  </div>
</template>

<style></style>
