<script setup>
import { ref } from 'vue'
import HomeCard from './HomeCard.vue'

const cards = ref([
  {
    title: 'For Developers',
    description: 'Find the right job',
    buttonTitle: 'Browse Jobs',
    isDeveloper: true
  },
  {
    title: 'For Developers',
    description: 'Find the right job',
    buttonTitle: 'Browse Jobs',
    isDeveloper: true
  }
])
</script>

<template>
  <section class="p-5 bg-[#127780] text-center">
    <h1 class="mb-5 text-3xl text-white font-bold">Browse Jobs</h1>
    <div class="flex gap-4 w-full justify-center">
      <HomeCard
        v-for="card in cards"
        :key="card"
        :title="card.title"
        :button-title="card.buttonTitle"
        :description="card.description"
        :isDeveloper="card.isDeveloper"
      />
    </div>
  </section>
</template>
