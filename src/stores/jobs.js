import { defineStore } from 'pinia'
import axios from 'axios'
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: [],
    siteJobs: [],
    userJobs: [],
    isLoading: false,
    error: null,
    lastFetchTime: 0
  }),
  actions: {
    async fetchJobsAndUpdateFirebase() {
      this.isLoading = true
      this.error = null

      try {
        const response = await axios.get('https://jobicy.com/api/v2/remote-jobs', {
          params: {
            count: 20,
            geo: 'usa',
            industry: 'dev'
          }
        })

        console.log('Fetched jobs from API')
        const jobs = response.data.jobs
        const now = Date.now()

        // Update Firebase with the new jobs
        const apiJobsRef = doc(db, 'apiJobs', 'latest')
        await setDoc(apiJobsRef, {
          jobs: jobs,
          lastUpdated: now
        })

        this.lastFetchTime = now
        this.jobs = jobs
      } catch (error) {
        console.error('Error fetching jobs from API:', error)
        if (axios.isAxiosError(error)) {
          this.error = error.response?.data?.error || error.message
        } else {
          this.error = 'An unexpected error occurred while fetching jobs from API'
        }
      } finally {
        this.isLoading = false
      }
    },

    async fetchJobsFromFirebase() {
      this.isLoading = true
      this.error = null

      try {
        const apiJobsRef = doc(db, 'apiJobs', 'latest')
        const apiJobsDoc = await getDoc(apiJobsRef)

        if (apiJobsDoc.exists()) {
          const data = apiJobsDoc.data()
          this.jobs = data.jobs
          this.lastFetchTime = data.lastUpdated
          console.log('Fetched jobs from Firebase')
        } else {
          console.log('No jobs found in Firebase, fetching from API')
          await this.fetchJobsAndUpdateFirebase()
        }
      } catch (error) {
        console.error('Error fetching jobs from Firebase:', error)
        this.error = 'An error occurred while fetching jobs from Firebase'
      } finally {
        this.isLoading = false
      }
    },

    async checkAndUpdateJobs() {
      try {
        await this.fetchJobsFromFirebase()

        const now = Date.now()
        const FETCH_INTERVAL = 86400000 // 24 hours in milliseconds

        if (now - this.lastFetchTime > FETCH_INTERVAL) {
          console.log('Jobs data is outdated, fetching new data from API')
          await this.fetchJobsAndUpdateFirebase()
        } else {
          console.log('Jobs data is up to date')
        }
      } catch (error) {
        console.error('Error in checkAndUpdateJobs:', error)
        this.error = 'An error occurred while checking and updating jobs'
      }
    },

    // Fetch jobs from Firestore
    async fetchSiteJobs() {
      try {
        const siteJobsCollectionRef = collection(db, 'siteJobs')
        const siteJobsSnapshot = await getDocs(siteJobsCollectionRef)
        this.siteJobs = siteJobsSnapshot.docs.map((doc) => ({
          ...doc.data()
        }))
      } catch (error) {
        console.error('Error fetching site jobs:', error)
      }
    },

    fetchUserJobs() {
      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          unsubscribe()
          if (user) {
            try {
              const userDocRef = doc(db, 'users', user.email)
              const userDocSnapshot = await getDoc(userDocRef)
              if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data()
                this.userJobs = userData.jobs || []
                resolve(this.userJobs)
              } else {
                console.log('User document does not exist')
                this.userJobs = []
                resolve(this.userJobs)
              }
            } catch (error) {
              console.error('Error fetching user jobs:', error)
              reject(error)
            }
          } else {
            console.log('No user is signed in')
            this.userJobs = []
            resolve(this.userJobs)
          }
        })
      })
    },

    async deleteJob(jobId, jobTitle) {
      try {
        const jobDocRef = doc(db, 'siteJobs', `${jobTitle}-${jobId}`)
        await deleteDoc(jobDocRef)

        const userDocRef = doc(db, 'users', auth.currentUser.email)
        const userDocSnapshot = await getDoc(userDocRef)

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data()
          const userJobs = userData.jobs || []
          const updatedJobs = userJobs.filter((job) => job.jobId !== jobId)
          await updateDoc(userDocRef, { jobs: updatedJobs })

          this.fetchUserJobs()
          this.fetchSiteJobs()
        } else {
          console.log('User document does not exist')
        }
      } catch (error) {
        console.error('Error deleting job:', error.message)
      }
    }
  }
})
