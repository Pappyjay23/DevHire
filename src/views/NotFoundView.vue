<script setup></script>

<template>
  <div class="h-screen w-full flex justify-center bg-[#127780]">
    <div class="flex flex-col gap-2 items-center mt-[70px] text-center">
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
  </div>
</template>

<style></style>
