<script setup>
import AppHero from '@/components/AppHero.vue'
import AppJobs from '@/components/AppJobs.vue'
import HomeCards from '@/components/HomeCards.vue'
import { ref } from 'vue'

const title = ref('Fuel Your Innovation with Top Tech Talent')
const description = ref(
  'DevHire connects you with developers who drive innovation. Find the experts who will bring your ideas to life and propel your business forward.'
)
</script>
<template>
  <AppHero :title="title" :description="description" />
  <HomeCards />
  <AppJobs limit="4" />
</template>

<style></style>
