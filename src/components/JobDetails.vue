<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'

const route = useRoute()
const jobId = parseInt(route.params.id)
const jobs = ref([])
const job = computed(() => {
  return jobs.value.length > jobId && jobId >= 0 ? jobs.value[jobId - 1] : null
})

onMounted(() => {
  // Retrieve jobs data from localStorage
  const storedJobs = JSON.parse(localStorage.getItem('jobs')) || []
  jobs.value = storedJobs
})

const truncateString = (str, num) => {
  if (str.length > num) {
    return str.slice(0, num) + '...'
  } else {
    return str
  }
}

const markdown = new MarkdownIt({
  breaks: true // Convert single newline characters to <br> tags
})
</script>
<template>
  <div
    v-if="job"
    class="bg-transparent backdrop-blur text-[#fff] border border-[#fff] px-5 py-10 rounded-[20px] w-full md:w-[40%] lg:w-[50%] mx-auto shadow-md mt-5"
  >
    <div class="flex flex-row gap-4 w-full justify-end mb-8 lg:mb-4">
      <RouterLink :to="`/jobs`">
        <button
          class="p-[6px] rounded-[4px] font-semibold bg-white border border-[#fff] text-[#127780] flex justify-center items-center gap-1"
        >
          <span class="font-bold">Edit</span> <v-icon name="fa-edit" scale="1.2"></v-icon></button
      ></RouterLink>
      <RouterLink :to="`/jobs`">
        <button
          class="p-[6px] rounded-[4px] font-semibold bg-white border border-[#fff] text-red-600 flex justify-center items-center gap-1"
        >
          <span class="font-bold">Delete</span>
          <v-icon name="bi-trash-fill" scale="1.2"></v-icon></button
      ></RouterLink>
    </div>
    <div class="w-[80%] mx-auto flex flex-col items-start gap-4">
      <h2 class="text-3xl font-bold text-center">
        {{ job.title }}
      </h2>
      <h2 class="text-xl font-semibold mb-2">{{ job.formattedExperienceLevel }}</h2>
      <h2 class="text-xl font-semibold">
        {{ job.formattedEmploymentStatus }}
      </h2>
      <h2 class="text-xl font-semibold">
        {{ job.workplaceTypes.join(', ') }}
      </h2>
      <div class="flex flex-col gap-4">
        <p class="font-semibold flex items-center gap-2">
          <v-icon scale="1.2" name="io-location-sharp"></v-icon>{{ job.formattedLocation }}
        </p>
      </div>
      <div class="flex flex-col gap-4">
        <p class="font-semibold flex items-center gap-3">
          <span class="font-semibold">Date Posted:</span> {{ job.listedAt.split('T')[0] }}
        </p>

        <p class="text-[1.1rem] font-semibold mt-2">Job Description:</p>
        <p
          class="text-[80%] mb-2 leading-8"
          v-html="truncateString(markdown.render(job.jobDescription), 1000)"
        ></p>
        <a class="font-bold" target="'_blank" :href="`${job.jobPostingUrl}`">
          <button
            class="py-3 px-6 rounded-[4px] font-semibold bg-white border border-[#fff] text-[#127780] text-[90%]"
          >
            Apply Here <v-icon name="bi-arrow-up-right"></v-icon>
          </button>
        </a>

        <h2 class="text-[1.1rem] font-semibold text-center mt-5">Company Info</h2>
        <h2 class="text-2xl font-bold">
          {{ job.company_data.name }}
        </h2>
        <p
          class="text-[80%] mb-2 leading-8"
          v-html="truncateString(markdown.render(job.company_data.description), 400)"
        ></p>
        <a class="font-bold" target="'_blank" :href="`${job.company_data.url}`">
          <button
            class="py-3 px-6 rounded-[4px] font-semibold bg-white border border-[#fff] text-[#127780] text-[90%]"
          >
            Read more <v-icon name="bi-arrow-up-right"></v-icon>
          </button>
        </a>
      </div>
    </div>
  </div>
</template>

<style></style>
