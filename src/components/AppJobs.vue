<script setup>
import { onMounted, ref } from 'vue'
import JobsCard from './JobsCard.vue'
import { computed } from 'vue'
import JobsBg from '@/assets/hero-bg.jpg'
import axios from 'axios'

const options = {
  method: 'GET',
  url: 'https://linkedin-data-scraper.p.rapidapi.com/search_jobs',
  params: {
    query: 'Software developer',
    page: '1',
    sortBy: 'DD'
  },
  headers: {
    'x-rapidapi-key': '6e83667247mshd69d9d7f98a5cd9p110252jsne2b73f83ca2b',
    'x-rapidapi-host': 'linkedin-data-scraper.p.rapidapi.com'
  }
}

const jobs = ref([])

// Function to fetch data from API and update localStorage
const fetchData = async () => {
  try {
    const response = await axios.request(options)
    const jobData = response.data.response.jobs
    jobs.value = jobData

    // Save the jobs data to localStorage
    localStorage.setItem('jobs', JSON.stringify(jobData))

    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}

// Function to load jobs from localStorage or fetch from API
const loadJobs = () => {
  const storedJobs = JSON.parse(localStorage.getItem('jobs'))
  if (storedJobs && storedJobs.length > 0) {
    jobs.value = storedJobs
  } else {
    fetchData()
  }
}

// Watch the route and update job based on index

onMounted(() => {
  loadJobs() // Load jobs from localStorage or fetch them if not present
})

defineProps({
  limit: Number
})

const input = ref('')
const filteredJobs = computed(() => {
  return jobs.value.filter((job) => {
    return job.title.toLowerCase().includes(input.value.toLowerCase())
  })
})
</script>

<template>
  <!--  <section class="p-5 bg-[#127780] text-center"> -->
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
      <div class="flex gap-4 w-full justify-center flex-wrap">
        <JobsCard
          v-for="(job, index) in filteredJobs.slice(0, limit || filteredJobs.length)"
          :key="job"
          :index="index"
          :title="job.title"
          :type="job.formattedEmploymentStatus"
          :workplace="job.workplaceTypes.join(', ')"
          :description="job.jobDescription"
          :location="job.formattedLocation"
          :experienceLevel="job.formattedExperienceLevel"
          :companyName="job.company_data.name"
          :companyDescription="job.company_data.description"
          :companyUrl="job.company_data.url"
          :jobApplyUrl="job.jobPostingUrl"
          :jobListDate="job.listedAt"
          buttonTitle="Read More"
        />
      </div>
      <RouterLink to="/jobs">
        <button
          v-if="limit"
          class="bg-[#fff] text-[#127780] py-3 px-8 rounded-[10px] font-semibold mt-5"
        >
          View All
        </button></RouterLink
      >
    </div>
  </section>
</template>

<style scoped>
::placeholder {
  color: white;
}
</style>
