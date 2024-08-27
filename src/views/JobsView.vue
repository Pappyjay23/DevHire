<script setup>
import AppJobs from '@/components/AppJobs.vue'
import JobsViewBg from '@/assets/job-bg-2.jpg'
</script>
<template>
  <div
    class="bg-[#127780] bg-fixed bg-cover bg-center relative z-10 min-h-screen"
    :style="{ backgroundImage: `url(${JobsViewBg})` }"
  >
    <div class="bg-[#000] absolute top-0 left-0 w-full h-full opacity-30 -z-20"></div>

    <AppJobs />
  </div>
</template>
