<script setup>
import NotFoundViewBg from '@/assets/job-bg-2.jpg'
</script>

<template>
  <div
    class="h-screen w-full flex justify-center bg-cover bg-center relative z-10"
    :style="{ backgroundImage: `url(${NotFoundViewBg})` }"
  >
    <div class="flex flex-col gap-2 items-center mt-[70px] text-center backdrop-blur">
      <v-icon name="md-warning-round" fill="yellow" scale="7"></v-icon>
      <h1 class="text-white font-bold text-5xl">404 Page Not Found</h1>
      <p class="text-white font-semibold text-[1.2rem]">This page does not exist</p>
      <RouterLink
        to="/"
        class="mt-10 py-3 px-8 rounded-[50px] w-[50%] mx-auto font-bold bg-[#fff] text-[#127780] text-center"
      >
        <button>Back To Home</button>
      </RouterLink>
    </div>
    <div class="bg-[#000] absolute top-0 left-0 w-full h-full opacity-90 -z-20"></div>
  </div>
</template>

<style></style>
