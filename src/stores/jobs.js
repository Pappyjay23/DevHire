// src/stores/jobs.ts
import { defineStore } from 'pinia'
import axios from 'axios'
// import { franc } from 'franc'

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: [],
    isLoading: true
  }),
  actions: {
    async fetchJobs() {
      const options = {
        method: 'GET',
        url: 'https://linkedin-data-scraper.p.rapidapi.com/search_jobs',
        params: {
          query: 'Software developer',
          page: '1',
          sortBy: 'DD'
        },
        headers: {
          'x-rapidapi-key': '6e83667247mshd69d9d7f98a5cd9p110252jsne2b73f83ca2b',
          'x-rapidapi-host': 'linkedin-data-scraper.p.rapidapi.com'
        }
      }

      try {
        const response = await axios.request(options)
        const allJobs = response.data.response.jobs

        // Filter out non-English job titles
        // this.jobs = allJobs.filter((job) => {
        //   const detectedLang = franc(job.title)
        //   return detectedLang === 'eng' || detectedLang === 'und'
        // })
        this.jobs = allJobs

        this.isLoading = false
      } catch (error) {
        console.error(error)
        // this.isLoading = false
      }
    }
  }
})
