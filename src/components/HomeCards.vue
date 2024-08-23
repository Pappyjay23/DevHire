<script setup>
import { ref } from 'vue'
import HomeCard from './HomeCard.vue'

const cards = ref([
  {
    title: 'For Developers',
    description: 'Find the right job',
    buttonTitle: 'Browse Jobs',
    isDeveloper: true,
    link: '/jobs'
  },
  {
    title: 'For Employers',
    description: 'Find the right person for your job',
    buttonTitle: 'Add Job',
    isDeveloper: false,
    link: '/add-job'
  }
])
</script>

<template>
  <section class="bg-gray-100 p-5">
    <div class="flex gap-4 w-full justify-center">
      <HomeCard
        v-for="(card, i) in cards"
        :key="i"
        :title="card.title"
        :description="card.description"
        :buttonTitle="card.buttonTitle"
        :isDeveloper="card.isDeveloper"
        :link="card.link"
      />
    </div>
  </section>
</template>

<style></style>
