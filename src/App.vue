<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen">
    <AppNavbar />
    <div class="pt-[63px] lg:pt-[72px] relative z-[10]">
      <RouterView />
    </div>
  </div>
</template>

<style></style>
