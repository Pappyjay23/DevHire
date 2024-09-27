<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { auth, db } from '@/firebase'
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'
import PulseLoader from 'vue-spinner/src/ClipLoader.vue'

const toast = useToast()
const router = useRouter()

const formFieldStyles = 'border-b border-[#fff] p-2 outline-none text-[90%]'

const schema = yup.object({
  jobType: yup.string().required('Job type is required'),
  jobTitle: yup
    .string()
    .required('Job title is required')
    .min(3, 'Job title must be at least 3 characters'),
  description: yup
    .string()
    .required('Job description is required')
    .min(20, 'Description must be at least 20 characters'),
  applicationLink: yup.string().required('Application link is required').url('Must be a valid URL'),
  location: yup.string().required('Location is required'),
  companyName: yup.string().required('Company name is required')
})

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema
})

const { value: jobType, errorMessage: jobTypeError, handleChange } = useField('jobType')
const { value: jobTitle } = useField('jobTitle')
const { value: description } = useField('description')
const { value: applicationLink } = useField('applicationLink')
const { value: location } = useField('location')
const { value: companyName } = useField('companyName')

const isLoading = ref(false)
const color = '#127780'
const size = '25px'

const onSubmit = handleSubmit(async (formValues) => {
  isLoading.value = true

  try {
    const userDocRef = doc(db, 'users', auth.currentUser.email)

    const jobId = uuidv4()
    const jobDocRef = doc(db, 'siteJobs', formValues.jobTitle + '-' + jobId)

    const jobData = {
      jobId,
      jobType: formValues.jobType,
      jobTitle: formValues.jobTitle,
      description: formValues.description,
      applicationLink: formValues.applicationLink,
      location: formValues.location,
      companyName: formValues.companyName,
      dateCreated: new Date().toDateString(),
      createdBy: auth.currentUser.email // Save the email of the user who created the job
    }

    // Update the user's document by adding the job to the 'jobs' array
    await updateDoc(userDocRef, {
      jobs: arrayUnion(jobData) // Add the job to the 'jobs' array in the user's document
    })

    // Save the job with the unique document ID in 'siteJobs'
    await setDoc(jobDocRef, jobData)

    toast.success('Job listing created successfully!')
    resetForm()
    router.push('/dashboard')
  } catch (error) {
    console.error('Error creating job:', error.message)
    toast.error('Failed to create job listing. Please try again.')
  }
})

const updateJobType = (event) => {
  const selectedValue = event.target.value
  handleChange(selectedValue)
}
</script>

<template>
  <div
    class="p-5 bg-transparent backdrop-blur flex justify-center w-full md:w-[80%] lg:w-[50%] mx-auto rounded-md border border-[#fff]"
  >
    <div class="text-[#fff] w-full">
      <h1 class="text-2xl lg:text-3xl text-white font-bold text-center mb-3 lg:mb-4">
        Create Job Listing
      </h1>
      <form @submit="onSubmit" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="job-type" class="font-bold text-white">Job Type</label>
          <select
            :value="jobType"
            @change="updateJobType"
            name="job-type"
            id="job-type"
            :class="[formFieldStyles, 'cursor-pointer']"
          >
            <option value="" disabled selected hidden>Select Job Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Remote">Remote</option>
            <option value="Internship">Internship</option>
          </select>
          <span v-if="jobTypeError" class="text-red-500 text-sm">{{ jobTypeError }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <label for="job-title" class="font-bold text-white">Job Title</label>
          <input
            v-model="jobTitle"
            type="text"
            name="job-title"
            id="job-title"
            placeholder="eg. Software Engineer"
            :class="formFieldStyles"
          />
          <span v-if="errors.jobTitle" class="text-red-500 text-sm">{{ errors.jobTitle }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <label for="description" class="font-bold text-white">Job Description</label>
          <textarea
            v-model="description"
            rows="3"
            name="description"
            id="description"
            placeholder="Add any job duties, expectations, requirements, etc"
            :class="formFieldStyles"
          />
          <span v-if="errors.description" class="text-red-500 text-sm">{{
            errors.description
          }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <label for="application-link" class="font-bold text-white">Job Application Link</label>
          <input
            v-model="applicationLink"
            type="text"
            name="application-link"
            id="application-link"
            placeholder="E.g. https://www.linkedin.com/jobs/view/123456789/"
            :class="formFieldStyles"
          />
          <span v-if="errors.applicationLink" class="text-red-500 text-sm">{{
            errors.applicationLink
          }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <label for="location" class="font-bold text-white">Location</label>
          <input
            v-model="location"
            type="text"
            name="location"
            id="location"
            placeholder="e.g New York"
            :class="formFieldStyles"
          />
          <span v-if="errors.location" class="text-red-500 text-sm">{{ errors.location }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <label for="company-name" class="font-bold text-white">Company Name</label>
          <input
            v-model="companyName"
            type="text"
            name="company-name"
            id="company-name"
            placeholder="e.g Microsoft"
            :class="formFieldStyles"
          />
          <span v-if="errors.companyName" class="text-red-500 text-sm">{{
            errors.companyName
          }}</span>
        </div>
        <button
          type="submit"
          class="py-3 px-8 rounded-[50px] w-[80%] md:w-[50%] lg:w-[40%] mx-auto bg-[#fff] text-[#127780] cursor-pointer flex justify-center"
        >
          <PulseLoader v-if="isLoading" :color="color" :size="size" />
          <span class="font-semibold" v-else> Post Job </span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
select,
select option,
textarea,
input,
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  background: transparent !important;
  -webkit-text-fill-color: white !important;
  caret-color: white !important;
  transition: background-color 5000s ease-in-out 0s;
}

::placeholder {
  color: white !important;
}

option {
  color: #127780 !important;
}
</style>
