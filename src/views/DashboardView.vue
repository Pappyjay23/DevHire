<script setup>
import HeroBg from '@/assets/job-bg.jpg'
import DashboardCard from '@/components/DashboardCard.vue'
import { useAuthStore } from '@/stores/auth'
import { useJobsStore } from '@/stores/jobs'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const jobsStore = useJobsStore()

onMounted(() => {
  jobsStore.fetchUserJobs()
})
</script>

<template>
  <section
    class="bg-[#127780] bg-fixed bg-cover bg-center relative z-10 min-h-screen w-full p-5"
    :style="{ backgroundImage: `url(${HeroBg})` }"
  >
    <div class="bg-[#000] absolute top-0 left-0 w-full min-h-screen h-full opacity-60 -z-20"></div>
    <h1 class="mb-5 text-3xl text-white font-bold text-center">Dashboard</h1>
    <div
      class="text-[#fff] md:px-5 py-10 rounded-[20px] w-full md:w-[95%] lg:w-[80%] mx-auto shadow-md mt-5 min-h-[50vh]"
    >
      <div class="flex flex-col items-center mb-[2rem]">
        <div class="flex flex-col items-center justify-center w-full gap-2 lg:w-[70%] mx-auto">
          <div
            class="backdrop-blur cursor-pointer py-2 px-4 rounded-[8px] text-[#fff] bg-transparent border border-white transition-all duration-300 font-bold text-[2.5rem] md:text-[3rem] w-fit h-fit tracking-[-0.5px]"
          >
            {{ authStore.userName.slice(0, 2) }}
          </div>
          <div
            class="flex flex-col gap-2 text-[#fff] px-4 py-2 text-[1.1rem] tracking-[-0.5px] text-center"
          >
            <span class="text-[1.5rem] md:text-[2rem] font-semibold">{{ authStore.userName }}</span>
            <span class="font-semibold md:text-[1.3rem]">{{ authStore.userRole }}</span>
            <span class="font-semibold text-[90%] md:text-base"> {{ authStore.userEmail }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div
          v-if="jobsStore.userJobs?.length > 0"
          class="flex gap-4 flex-wrap w-full justify-center"
        >
          <DashboardCard
            v-for="(job, index) in jobsStore.userJobs?.slice(0, jobsStore.userJobs.length)"
            :key="job"
            :index="index"
            :title="job.jobTitle"
            :type="job.jobType"
            :description="job.description"
            :location="job.location"
            :companyName="job.companyName"
            :jobApplyUrl="job.applicationLink"
            :jobListDate="job.dateCreated"
            :jobOwner="job.createdBy"
            :jobId="job.jobId"
          />
        </div>
        <div v-else class="flex flex-col gap-4 items-center w-full justify-center">
          <span class="text-[1.2rem] text-center"
            >No jobs created yet. Create one
            <RouterLink :to="`/post-job`" class="font-bold">here</RouterLink>
          </span>
          <div class="text-[90%]"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
