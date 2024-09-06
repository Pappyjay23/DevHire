<script setup>
import { onMounted, ref, computed } from 'vue'
import JobsCard from './JobsCard.vue'
import JobsBg from '@/assets/hero-bg.jpg'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { useJobsStore } from '@/stores/jobs'

const jobsStore = useJobsStore()

onMounted(() => {
  if (jobsStore.jobs.length === 0) {
    jobsStore.fetchJobs()
  }
})

defineProps({
  limit: Number
})

const input = ref('')
const filteredJobs = computed(() => {
  return jobsStore.jobs?.filter((job) => {
    return job.jobTitle.toLowerCase().includes(input.value.toLowerCase())
  })
})

const color = '#fff'
const size = '20px'
</script>

<template>
  <section
    class="p-5 text-center bg-fixed bg-cover bg-center relative z-10 min-h-screen h-full"
    :style="{ backgroundImage: `url(${limit && JobsBg})` }"
  >
    <div class="bg-[#000] absolute top-0 left-0 w-full min-h-screen h-full opacity-30 -z-20"></div>
    <div class="z-30">
      <h1 class="mb-5 text-3xl text-white font-bold">Browse Jobs</h1>
      <input
        class="mb-5 w-full md:w-2/4 p-2 outline-none border-0 text-[90%] text-[#fff] bg-transparent border-b border-[#fff]"
        placeholder="Search jobs by title"
        v-if="!limit"
        type="search"
        v-model="input"
      />
      <div v-if="jobsStore.isLoading" class="mt-10">
        <PulseLoader :color="color" :size="size" />
      </div>
      <div v-else class="flex gap-4 w-full justify-center flex-wrap">
        <JobsCard
          v-for="(job, index) in filteredJobs?.slice(0, limit || filteredJobs.length)"
          :key="job"
          :index="index"
          :title="job.jobTitle"
          :type="job.jobType.join(', ').charAt(0).toUpperCase() + job.jobType.join(', ').slice(1)"
          :description="job.jobExcerpt"
          :location="job.jobGeo"
          :companyName="job.companyName"
          :jobApplyUrl="job.url"
          :jobListDate="job.pubDate"
          buttonTitle="Read More"
        />
      </div>
      <RouterLink to="/jobs" v-if="!jobsStore.isLoading">
        <button
          v-if="limit"
          class="bg-[#fff] text-[#127780] py-3 px-8 rounded-[10px] font-semibold mt-5"
        >
          View All
        </button>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
::placeholder {
  color: white;
}
</style>
