<script setup>
import { jobs } from '@/data/jobs'
import { useRoute } from 'vue-router'

const route = useRoute()
const jobId = route.params.id
const job = jobs[jobId - 1]
</script>
<template>
  <div
    class="bg-transparent backdrop-blur text-[#fff] border border-[#fff] px-5 py-10 rounded-[20px] w-full md:w-[40%] lg:w-[50%] mx-auto shadow-md mt-5"
  >
    <div class="w-[80%] mx-auto flex flex-col items-start gap-4">
      <h2 class="text-3xl font-bold text-center">
        {{ job.title }}
      </h2>
      <h2 class="text-xl font-semibold">
        {{ job.type }}
      </h2>
      <p class="text-[90%] mb-2">{{ job.description }}</p>
      <div class="flex flex-col gap-4">
        <p class="font-semibold">{{ job.salary }}/year</p>
        <p class="font-semibold flex items-center gap-2">
          <v-icon scale="1.2" name="io-location-sharp"></v-icon>{{ job.location }}
        </p>
      </div>
      <h2 class="text-[1.1rem] font-semibold text-center mt-5">Company Info</h2>
      <h2 class="text-2xl font-bold">
        {{ job.company.name }}
      </h2>
      <p class="text-[90%] mb-2">{{ job.company.description }}</p>
      <div class="flex flex-col gap-4">
        <p class="font-semibold flex items-center gap-3">
          <v-icon scale="1.3" name="io-mail"></v-icon>{{ job.company.contactEmail }}
        </p>
        <p class="font-semibold flex items-center gap-3">
          <v-icon scale="1.3" name="md-contactphone-round"></v-icon>{{ job.company.contactPhone }}
        </p>
      </div>
      <div class="flex flex-col lg:flex-row gap-4 w-full justify-center">
        <RouterLink :to="`/jobs`">
          <button
            class="py-3 px-8 rounded-[4px] font-semibold bg-white border border-[#fff] text-[#127780]"
          >
            Edit Job
          </button></RouterLink
        >
        <RouterLink :to="`/jobs`">
          <button
            class="py-3 px-8 rounded-[4px] font-semibold bg-white border border-[#fff] text-red-600"
          >
            Delete Job
          </button></RouterLink
        >
      </div>
    </div>
  </div>
</template>

<style></style>
