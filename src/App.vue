<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <AppNavbar />
  <div class="pt-[72px]">
    <RouterView />
  </div>
</template>

<style></style>
