<script setup>
import { useAuthStore } from '@/stores/auth'
import { useJobsStore } from '@/stores/jobs'
import { computed, onMounted, ref } from 'vue'
import JobsCard from './JobsCard.vue'
import JobsBg from '@/assets/hero-bg.jpg'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const jobsStore = useJobsStore()
const authStore = useAuthStore()

onMounted(() => {
  if (jobsStore.jobs.length === 0) {
    jobsStore.fetchJobs()
  }
  jobsStore.fetchSiteJobs()
})

defineProps({
  limit: Number
})

const input = ref('')
const activeTab = ref('api')
const filteredJobs = computed(() => {
  const jobs = activeTab.value === 'api' ? jobsStore.jobs : jobsStore.siteJobs
  return jobs?.filter((job) => {
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

      <!-- Tabs component -->
      <div class="mb-5 text-xl relative">
        <div class="tabs-container">
          <button
            @click="activeTab = 'api'"
            :class="['tab-button', activeTab === 'api' ? 'active' : '']"
          >
            API Jobs
          </button>
          <button
            @click="activeTab = 'site'"
            :class="['tab-button', activeTab === 'site' ? 'active' : '']"
          >
            Site Jobs
          </button>
        </div>
      </div>

      <div
        v-if="activeTab === 'api' && jobsStore.jobs.length === 0 && !jobsStore.isLoading"
        class="mt-10"
      >
        <span class="text-white text-[1.5rem] font-semibold">No jobs available here.</span>
      </div>

      <div
        v-if="activeTab === 'site' && jobsStore.siteJobs.length === 0 && !jobsStore.isLoading"
        class="mt-10"
      >
        <span class="text-white text-[1.5rem] font-semibold">No jobs available here.</span>
      </div>

      <div v-if="jobsStore.isLoading" class="mt-10">
        <PulseLoader :color="color" :size="size" />
      </div>

      <div v-else class="flex gap-4 w-full justify-center flex-wrap">
        <JobsCard
          v-for="(job, index) in filteredJobs?.slice(0, limit || filteredJobs.length)"
          :key="index"
          :index="index"
          :title="job.jobTitle"
          :type="
            activeTab === 'api'
              ? job.jobType.join(', ').charAt(0).toUpperCase() + job.jobType.join(', ').slice(1)
              : job.jobType
          "
          :description="activeTab === 'api' ? job.jobExcerpt : job.description"
          :location="activeTab === 'api' ? job.jobGeo : job.location"
          :companyName="job.companyName"
          :jobApplyUrl="activeTab === 'api' ? job.url : job.applicationLink"
          :jobListDate="activeTab === 'api' ? job.pubDate : job.dateCreated"
          :jobOwner="job.createdBy"
          :jobId="job.jobId"
          buttonTitle="Read More"
          :activeTab="activeTab"
        />
      </div>
      <RouterLink
        :to="`${authStore.isLoggedIn ? '/jobs' : '/login'}`"
        v-if="!jobsStore.isLoading && filteredJobs.length !== 0"
      >
        <button
          v-if="limit && jobsStore.jobs.length !== 0"
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

.tabs-container {
  position: relative;
  display: inline-flex;
}

.tab-button {
  padding: 0.5rem 1rem;
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-button.active {
  font-weight: 600;
}

.tabs-container::after {
  content: '';
  position: absolute;
  bottom: -2px;
  height: 2px;
  background: white;
  transition: all 0.3s ease;
}

.tabs-container:has(.tab-button:first-child.active)::after {
  left: 0;
  width: 50%;
}

.tabs-container:has(.tab-button:last-child.active)::after {
  left: 50%;
  width: 50%;
}
</style>
