<script setup>
import HeroBg from '@/assets/job-bg.jpg'
import AuthForm from '@/components/AuthForm.vue'
</script>

<template>
  <section
    class="bg-[#127780] bg-fixed bg-cover bg-center relative z-10 min-h-screen w-full p-5 flex items-center"
    :style="{ backgroundImage: `url(${HeroBg})` }"
  >
    <div class="bg-[#000] absolute top-0 left-0 w-full h-full opacity-70 -z-20"></div>
    <AuthForm />
  </section>
</template>

<style></style>
