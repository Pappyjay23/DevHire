<script setup>
import { onMounted } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { auth, db } from '@/firebase'
import { arrayUnion, deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useJobsStore } from '@/stores/jobs'

const toast = useToast()
const router = useRouter()

const formFieldStyles = 'border-b border-[#fff] p-2 outline-none text-[90%]'

// Validation schema for the form
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

// Form setup
const { handleSubmit, errors, resetForm, setValues } = useForm({
  validationSchema: schema
})

const { value: jobType, errorMessage: jobTypeError, handleChange } = useField('jobType')
const { value: jobTitle } = useField('jobTitle')
const { value: description } = useField('description')
const { value: applicationLink } = useField('applicationLink')
const { value: location } = useField('location')
const { value: companyName } = useField('companyName')

// Get the job ID from the route
const jobId = router.currentRoute.value.params.id
const jobTitleFromParams = router.currentRoute.value.params.title

// Fetch job data when the component mounts
onMounted(async () => {
  try {
    const jobDocRef = doc(db, 'siteJobs', jobTitleFromParams + '-' + jobId)
    const jobSnap = await getDoc(jobDocRef)

    if (jobSnap.exists()) {
      const jobData = jobSnap.data()
      // Pre-fill the form with the job data
      setValues({
        jobType: jobData.jobType,
        jobTitle: jobData.jobTitle,
        description: jobData.description,
        applicationLink: jobData.applicationLink,
        location: jobData.location,
        companyName: jobData.companyName
      })
    } else {
      toast.error('Job not found')
      router.push('/dashboard')
    }
  } catch (error) {
    console.error('Error fetching job data:', error.message)
    toast.error('Failed to fetch job data. Please try again.')
  }
})

const jobsStore = useJobsStore()

const onSubmit = handleSubmit(async (formValues) => {
  console.log('Edited Form values: ', formValues)
  try {
    const userDocRef = doc(db, 'users', auth.currentUser.email)
    const userDoc = await getDoc(userDocRef)

    // Check if the user's document exists
    if (!userDoc.exists()) {
      throw new Error('User document does not exist')
    }

    const jobsArray = userDoc.data().jobs // Fetch current jobs

    // Check if jobId is defined and exists in the jobs array
    const jobToUpdate = jobsArray.find((job) => job.jobId === jobId)
    if (!jobToUpdate) {
      throw new Error('Job with the specified jobId does not exist in user jobs')
    }

    // Filter the jobs array to remove the job with the specified jobId
    const updatedJobsArray = jobsArray.filter((job) => job.jobId !== jobId)

    // Create job object with updated data
    const jobData = {
      jobId, // Include the existing jobId
      jobType: formValues.jobType,
      jobTitle: formValues.jobTitle,
      description: formValues.description,
      applicationLink: formValues.applicationLink,
      location: formValues.location,
      companyName: formValues.companyName,
      dateCreated: new Date().toDateString(), // Store the last updated date
      createdBy: auth.currentUser.email // Save the email of the user who updated the job
    }

    // Update the user's document with the new jobs array
    await updateDoc(userDocRef, {
      jobs: updatedJobsArray // Set the new jobs array
    })

    // Add the updated job to the 'jobs' array in the user's document
    await updateDoc(userDocRef, {
      jobs: arrayUnion(jobData) // Add the updated job to the user's jobs
    })

    // Check if the job title has changed before updating the 'siteJobs' collection
    if (formValues.jobTitle !== jobTitleFromParams) {
      // Reference the old job document
      const oldJobDocRef = doc(db, 'siteJobs', jobTitleFromParams + '-' + jobId)

      // Create a new job document with the updated jobTitle in the document ID
      const newJobDocRef = doc(db, 'siteJobs', formValues.jobTitle + '-' + jobId)

      // Get the old job document data
      const oldJobDoc = await getDoc(oldJobDocRef)

      if (!oldJobDoc.exists()) {
        throw new Error('Old job document does not exist')
      }

      // Set the new job document with the updated data
      await setDoc(newJobDocRef, jobData)

      // Delete the old job document
      await deleteDoc(oldJobDocRef)
    } else {
      // If the title hasn't changed, just update the existing document
      const jobDocRef = doc(db, 'siteJobs', jobTitleFromParams + '-' + jobId)
      await updateDoc(jobDocRef, jobData)
    }

    toast.success('Job listing updated successfully!')
    resetForm()
    jobsStore.fetchUserJobs()
    jobsStore.fetchSiteJobs()
    router.push('/dashboard')
  } catch (error) {
    console.error('Error updating job:', error.message)
    toast.error('Failed to update job listing. Please try again.')
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
        Edit Job Listing
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
          class="py-3 px-8 rounded-[50px] w-[80%] md:w-[50%] lg:w-[40%] mx-auto font-semibold bg-[#fff] text-[#127780] cursor-pointer"
        >
          Update Job
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
