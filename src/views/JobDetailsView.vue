<script setup>
import JobsViewBg from '@/assets/job-bg.jpg'
import JobDetails from '@/components/JobDetails.vue'
</script>

<template>
  <div
    class="bg-fixed bg-cover bg-center relative z-10 min-h-screen w-full"
    :style="{ backgroundImage: `url(${JobsViewBg})` }"
  >
    <div class="bg-[#000] absolute top-0 left-0 w-full h-full opacity-50 -z-20"></div>
    <div class="h-full backdrop-blur p-5 min-h-screen w-full">
      <RouterLink class="flex items-center cursor-pointer" :to="`/jobs`">
        <v-icon name="bi-arrow-left-short" class="text-[#fff]" scale="2"></v-icon>
        <span class="font-semibold text-[#fff]"> Back to Jobs </span></RouterLink
      >
      <JobDetails />
    </div>
  </div>
</template>

<style></style>
