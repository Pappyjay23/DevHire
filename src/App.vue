<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

// Clear local storage when the entire app mounts
onMounted(() => {
  localStorage.removeItem('jobs') // Clear the jobs data from local storage
})
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
