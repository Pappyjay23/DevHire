<script setup>
import { useAuthStore } from '@/stores/auth'
import { useJobsStore } from '@/stores/jobs'
import { ref } from 'vue'
import ConfirmationDialog from './ConfirmationDialog.vue'

const props = defineProps({
  index: Number,
  title: String,
  type: String,
  description: String,
  location: String,
  companyName: String,
  jobApplyUrl: String,
  jobListDate: String,
  jobOwner: String,
  jobId: String
})

const authStore = useAuthStore()

const jobsStore = useJobsStore()
const showConfirmationDialog = ref(false)

const handleDelete = async () => {
  await jobsStore.deleteJob(props.jobId, props.title)
  showConfirmationDialog.value = false // Close the dialog after deletion
}
</script>

<template>
  <ConfirmationDialog
    :isVisible="showConfirmationDialog"
    @cancel="showConfirmationDialog = false"
    @confirm="handleDelete"
  />
  <div
    class="bg-transparent backdrop-blur text-[#fff] border border-[#fff] px-5 py-10 rounded-[20px] w-full md:w-[45%] flex flex-col gap-4 items-center shadow-md text-center"
  >
    <div
      class="flex flex-row gap-4 w-full justify-end"
      v-if="authStore.isLoggedIn && jobOwner === authStore.userEmail"
    >
      <RouterLink :to="`/edit-job/${jobId}`">
        <button
          title="Edit Job"
          class="p-[6px] rounded-[4px] font-semibold bg-white border border-[#fff] text-[#127780] flex justify-center items-center gap-1"
        >
          <v-icon name="fa-edit" scale="1.2"></v-icon>
        </button>
      </RouterLink>
      <button
        @click="showConfirmationDialog = true"
        title="Delete Job"
        class="p-[6px] rounded-[4px] font-semibold bg-white border border-[#fff] text-red-600 flex justify-center items-center gap-1"
      >
        <v-icon name="bi-trash-fill" scale="1.2"></v-icon>
      </button>
    </div>
    <h4 class="text-[90%] font-bold">{{ jobListDate }}</h4>
    <h2 class="text-xl font-semibold">
      {{ type }}
    </h2>
    <h2 class="text-2xl font-bold min-h-[80px]">{{ title }}</h2>

    <div v-if="description" class="h-[150px] overflow-auto lg:pr-3">
      <p class="text-[80%] mb-2 leading-8 min-h-[150px]" v-html="`${description}`"></p>
    </div>
    <p v-else class="text-[90%] mb-2 leading-8 min-h-[120px]">No description available</p>
    <div class="flex flex-col gap-4 mt-[2rem]">
      <p class="font-semibold">
        <span><v-icon name="io-location-sharp"></v-icon></span>{{ location }}
      </p>
    </div>
    <div class="w-full flex justify-center">
      <a class="font-bold" target="'_blank" :href="`${jobApplyUrl}`">
        <button
          class="py-3 px-6 rounded-[4px] font-semibold bg-white border border-[#fff] text-[#127780] text-[90%]"
        >
          Application Link <v-icon name="bi-arrow-up-right"></v-icon>
        </button>
      </a>
    </div>
  </div>
</template>

<style></style>
