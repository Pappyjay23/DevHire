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
  companyDescription: String,
  companyUrl: String,
  jobApplyUrl: String,
  jobListDate: String,
  buttonTitle: String,
  activeTab: String,
  jobOwner: String,
  jobId: String,
  showPlaceHolder: Boolean
})

const truncateString = (str, num) => {
  if (str.length > num) {
    return str.slice(0, num) + '...'
  } else {
    return str
  }
}

const authStore = useAuthStore()
const jobsStore = useJobsStore()
const showConfirmationDialog = ref(false)
const isLoading = ref(false)

const handleDelete = async () => {
  isLoading.value = true
  await jobsStore.deleteJob(props.jobId, props.title)
  showConfirmationDialog.value = false
}

const getRoute = (activeTab, index) => {
  if (!authStore.isLoggedIn) {
    return '/login'
  }

  if (activeTab === 'api') {
    return `/jobs/api/${index + 1}`
  } else {
    return `/jobs/site/${index + 1}`
  }
}
</script>

<template>
  <ConfirmationDialog
    :isLoading="isLoading"
    :isVisible="showConfirmationDialog"
    @cancel="showConfirmationDialog = false"
    @confirm="handleDelete"
  />
  <div
    class="bg-transparent backdrop-blur text-[#fff] border border-[#fff] px-5 py-10 rounded-[20px] w-full md:w-[40%] lg:w-[30%] flex flex-col gap-4 items-center shadow-md text-center"
  >
    <div
      v-if="activeTab !== 'api' && authStore.isLoggedIn && jobOwner === authStore.userEmail"
      class="flex flex-row gap-4 w-full justify-end"
    >
      <RouterLink :to="`/edit-job/${title}/${jobId}`">
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
    <div v-show="showPlaceHolder && jobOwner !== authStore.userEmail" class="min-h-[36px]"></div>
    <h2 class="text-xl font-semibold">
      {{ type }}
    </h2>
    <h2 class="text-2xl font-bold min-h-[80px] tracking-[-0.5px]">{{ title }}</h2>

    <p
      v-if="description"
      class="text-[80%] mb-2 leading-8 min-h-[150px]"
      v-html="`${truncateString(description, 150)}`"
    ></p>
    <p v-else class="text-[90%] mb-2 leading-8 min-h-[120px]">No description available</p>
    <div class="flex flex-col gap-4">
      <p class="font-semibold">
        <span><v-icon name="io-location-sharp"></v-icon></span>{{ location }}
      </p>
    </div>
    <RouterLink :to="getRoute(activeTab, index)">
      <button
        class="py-3 px-8 rounded-[4px] font-semibold bg-white border border-[#fff] text-[#127780]"
      >
        {{ buttonTitle }}
      </button></RouterLink
    >
  </div>
</template>

<style></style>
