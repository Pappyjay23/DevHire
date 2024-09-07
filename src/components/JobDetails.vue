<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJobsStore } from '@/stores/jobs'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { onMounted } from 'vue'

const jobsStore = useJobsStore()

const route = useRoute()
const router = useRouter()

const job = ref()

const isApi = computed(() => route.path.includes('/jobs/api/'))

onMounted(async () => {
  const jobId = parseInt(route.params.id)

  if (isApi.value) {
    if (jobsStore.jobs.length === 0) {
      await jobsStore.fetchJobs()
    }
    job.value = jobsStore.jobs[jobId - 1]
  } else {
    if (jobsStore.siteJobs.length === 0) {
      jobsStore.fetchSiteJobs()
    }
    job.value = jobsStore.siteJobs[jobId - 1]
  }

  if (!job.value) {
    console.log('Job not found, redirecting...')
    router.push('/jobs')
  }
})

const color = '#fff'
const size = '20px'
</script>

<template>
  <div
    v-if="job && !jobsStore.isLoading"
    class="bg-transparent backdrop-blur text-[#fff] border border-[#fff] px-5 py-10 rounded-[20px] w-full md:w-[70%] lg:w-[50%] mx-auto shadow-md mt-5"
  >
    <div v-if="!isApi" class="flex flex-row gap-4 w-full justify-end mb-8 lg:mb-4">
      <RouterLink :to="`/jobs`">
        <button
          class="p-[6px] rounded-[4px] bg-white border border-[#fff] text-[#127780] flex justify-center items-center gap-1"
        >
          <span class="font-medium">Edit</span> <v-icon name="fa-edit" scale="1.2"></v-icon></button
      ></RouterLink>
      <RouterLink :to="`/jobs`">
        <button
          class="p-[6px] rounded-[4px] bg-white border border-[#fff] text-red-600 flex justify-center items-center gap-1"
        >
          <span class="font-medium">Delete</span>
          <v-icon name="bi-trash-fill" scale="1.2"></v-icon></button
      ></RouterLink>
    </div>
    <div class="lg:w-[80%] mx-auto flex flex-col items-start gap-4">
      <h2 class="text-4xl font-bold text-center">
        {{ job.jobTitle }}
      </h2>
      <div>
        <h2 class="text-[15px] font-bold tracking-wide">Company Name:</h2>
        <h2 class="text-2xl font-bold tracking-wide">
          {{ job.companyName.charAt(0).toUpperCase() + job.companyName.slice(1) }}
        </h2>
      </div>
      <h2 v-if="isApi" class="text-xl font-semibold">
        {{ job.jobType?.join(', ').charAt(0).toUpperCase() + job.jobType.join(', ').slice(1) }}
      </h2>
      <h2 v-else class="text-xl font-semibold">
        {{ job.jobType }}
      </h2>
      <div class="flex flex-col gap-4">
        <p class="font-semibold flex items-center gap-2">
          <v-icon scale="1.2" name="io-location-sharp"></v-icon>{{ job.jobGeo }}
        </p>
      </div>
      <div class="flex flex-col gap-4 mb-5">
        <p class="font-semibold flex items-center gap-3">
          <span class="font-semibold">Date Posted:</span> {{ job.pubDate.split(' ')[0] }}
        </p>

        <p class="text-[1.1rem] font-semibold mt-2">Job Description:</p>
        <div class="h-[300px] overflow-auto lg:pr-3">
          <p class="text-[80%] mb-2 leading-8" v-html="`${job.jobDescription}`"></p>
        </div>
      </div>
      <div class="w-full flex justify-center">
        <a class="font-bold" target="'_blank" :href="`${job.url}`">
          <button
            class="py-3 px-6 rounded-[4px] font-semibold bg-white border border-[#fff] text-[#127780] text-[90%]"
          >
            Apply Here <v-icon name="bi-arrow-up-right"></v-icon>
          </button>
        </a>
      </div>
    </div>
  </div>
  <div v-else class="mt-10 flex justify-center">
    <PulseLoader :color="color" :size="size" />
  </div>
</template>

<style></style>
