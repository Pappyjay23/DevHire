import { defineStore } from 'pinia'
import axios from 'axios'

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: [],
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
            industry: 'engineering'
          }
        })
        console.log('Response data:', response.data.jobs)

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
    }

    // async loadMoreJobs() {
    //   if (this.currentPage * this.resultsPerPage < this.totalResults) {
    //     await this.fetchJobs(query, this.currentPage + 1)
    //   }
    // }
  }
})
