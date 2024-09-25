import { defineStore } from 'pinia'
import axios from 'axios'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { auth, db } from '@/firebase'

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: [],
    siteJobs: [],
    userJobs: [],
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchJobs() {
      this.isLoading = true
      this.error = null

      try {
        const response = await axios.get('https://jobicy.com/api/v2/remote-jobs', {
          params: {
            count: 20,
            geo: 'usa',
            industry: 'dev'
            // industry: 'engineering'
          }
        })

        this.jobs = response.data.jobs
      } catch (error) {
        console.error('Error fetching jobs:', error)
        if (axios.isAxiosError(error)) {
          this.error = error.response?.data?.error || error.message
        } else {
          this.error = 'An unexpected error occurred'
        }
      } finally {
        this.isLoading = false
      }
    },

    // Fetch jobs from Firestore
    fetchSiteJobs: async function () {
      try {
        // Reference to the 'siteJobs' collection
        const siteJobsCollectionRef = collection(db, 'siteJobs')

        // Fetch all documents from the 'siteJobs' collection
        const siteJobsSnapshot = await getDocs(siteJobsCollectionRef)

        // Map over the documents and store the data
        this.siteJobs = siteJobsSnapshot.docs.map((doc) => ({
          ...doc.data() // Spread the job data
        }))
      } catch (error) {
        console.error('Error fetching site jobs:', error)
      }
    },

    fetchUserJobs: async function () {
      try {
        // Reference to the current user's document in 'users' collection
        const userDocRef = doc(db, 'users', auth.currentUser.email)

        // Fetch the user's document
        const userDocSnapshot = await getDoc(userDocRef)

        if (userDocSnapshot.exists()) {
          // Extract the 'jobs' array from the user document
          const userData = userDocSnapshot.data()
          this.userJobs = userData.jobs || [] // If no jobs, default to an empty array
        } else {
          console.log('User document does not exist')
        }
      } catch (error) {
        console.error('Error fetching user jobs:', error)
      }
    }
  }
})
