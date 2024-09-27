<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJobsStore } from '@/stores/jobs'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import ConfirmationDialog from './ConfirmationDialog.vue'

const jobsStore = useJobsStore()
const authStore = useAuthStore()

const route = useRoute()
const router = useRouter()

const job = ref()
const jobDetails = ref({})

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

  jobDetails.value = {
    title: job.value?.jobTitle,
    type: isApi.value
      ? job.value?.jobType.join(', ').charAt(0).toUpperCase() +
        job.value?.jobType.join(', ').slice(1)
      : job.value?.jobType,
    description: isApi.value ? job.value?.jobDescription : job.value?.description,
    location: isApi.value ? job.value?.jobGeo : job.value?.location,
    companyName: job.value?.companyName.charAt(0).toUpperCase() + job.value?.companyName?.slice(1),
    jobApplyUrl: isApi.value ? job.value?.url : job.value?.applicationLink,
    jobListDate: isApi.value ? job.value?.pubDate.split(' ')[0] : job.value?.dateCreated,
    jobOwner: job.value?.createdBy,
    jobId: job.value?.jobId
  }
})

const showConfirmationDialog = ref(false)

const handleDelete = async () => {
  await jobsStore.deleteJob(jobDetails.value.jobId, jobDetails.value.title)
  showConfirmationDialog.value = false
  router.push('/jobs')
}

const color = '#fff'
const size = '20px'
</script>

<template>
  <ConfirmationDialog
    :isVisible="showConfirmationDialog"
    @cancel="showConfirmationDialog = false"
    @confirm="handleDelete"
  />
  <div
    v-if="job && !jobsStore.isLoading"
    class="bg-transparent backdrop-blur text-[#fff] border border-[#fff] px-5 py-10 rounded-[20px] w-full md:w-[70%] lg:w-[50%] mx-auto shadow-md mt-5"
  >
    <div
      v-if="authStore.isLoggedIn && jobDetails.jobOwner === authStore.userEmail"
      class="flex flex-row gap-4 w-full justify-end mb-8 lg:mb-4"
    >
      <RouterLink :to="`/edit-job/${jobDetails.title}/${jobDetails.jobId}`">
        <button
          class="p-[6px] rounded-[4px] bg-white border border-[#fff] text-[#127780] flex justify-center items-center gap-1"
        >
          <span class="font-medium">Edit</span> <v-icon name="fa-edit" scale="1.2"></v-icon></button
      ></RouterLink>
      <button
        @click="showConfirmationDialog = true"
        class="p-[6px] rounded-[4px] bg-white border border-[#fff] text-red-600 flex justify-center items-center gap-1"
      >
        <span class="font-medium">Delete</span>
        <v-icon name="bi-trash-fill" scale="1.2"></v-icon>
      </button>
    </div>
    <div class="lg:w-[80%] mx-auto flex flex-col items-start gap-4">
      <h2 class="text-[1.5rem] md:text-[1.8rem] font-bold text-left tracking-[-1px]">
        {{ jobDetails.title }}
      </h2>
      <div>
        <h2 class="text-[12px] font-semibold tracking-wide">Company Name:</h2>
        <h2 class="text-xl font-bold tracking-normal">
          {{ jobDetails.companyName }}
        </h2>
      </div>
      <h2 class="text-[1rem] font-semibold">
        {{ jobDetails.type }}
      </h2>

      <div class="flex flex-col gap-4">
        <p class="font-semibold flex items-center gap-2">
          <v-icon scale="1.2" name="io-location-sharp"></v-icon>{{ jobDetails.location }}
        </p>
      </div>
      <div class="flex flex-col gap-4 mb-5">
        <p class="font-semibold flex items-center gap-3">
          <span class="font-semibold">Date Posted:</span> {{ jobDetails.jobListDate }}
        </p>

        <p class="text-[1.1rem] font-semibold mt-2">Job Description:</p>
        <div :class="`${isApi ? 'h-[300px]' : 'h-[170px]'} overflow-auto lg:pr-3`">
          <p class="text-[80%] mb-2 leading-8" v-html="`${jobDetails.description}`"></p>
        </div>
      </div>
      <div class="w-full flex justify-center">
        <a class="font-bold" target="'_blank" :href="`${jobDetails.jobApplyUrl}`">
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
