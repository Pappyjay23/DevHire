<script setup>
import { computed } from 'vue'
import AppNavbar from '@/components/AppNavbar.vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()

const showNavbar = computed(() => {
  return !['/login', '/sign-up'].includes(route.path)
})
</script>

<template>
  <div class="min-h-screen bg-[#0d5258]">
    <AppNavbar v-if="showNavbar" />
    <div :class="{ 'pt-[63px] lg:pt-[72px]': showNavbar }" class="relative z-[10]">
      <RouterView />
    </div>
  </div>
</template>

<style></style>
