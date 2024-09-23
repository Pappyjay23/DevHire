import { defineStore } from 'pinia'
import axios from 'axios'

const siteJobs = [
  {
    jobTitle: 'Backend Developer',
    jobType: 'Part-Time',
    jobExcerpt:
      'Looking for a Backend Developer to maintain and improve our server-side applications. Experience with Node.js, Express, and MongoDB is preferred.',
    jobDescription:
      'Looking for a Backend Developer to maintain and improve our server-side applications. Experience with Node.js, Express, and MongoDB is preferred.Looking for a Backend Developer to maintain and improve our server-side applications. Experience with Node.js, Express, and MongoDB is preferred.Looking for a Backend Developer to maintain and improve our server-side applications. Experience with Node.js, Express, and MongoDB is preferred.',
    jobGeo: 'Chicago, IL',
    companyName: 'ServerSide Solutions',
    url: 'https://www.linkedin.com/jobs/view/123456789',
    pubDate: '2022-01-01'
  },
  {
    jobTitle: 'Frontend Developer',
    jobType: 'Part-Time',
    jobExcerpt:
      'Looking for a Frotnend Developer to maintain and improve our server-side applications. Experience with Node.js, Express, and MongoDB is preferred.',
    jobDescription:
      'Looking for a Frotnend Developer to maintain and improve our server-side applications. Experience with Node.js, Express, and MongoDB is preferred.Looking for a Frotnend Developer to maintain and improve our server-side applications. Experience with Node.js, Express, and MongoDB is preferred.Looking for a Frotnend Developer to maintain and improve our server-side applications. Experience with Node.js, Express, and MongoDB is preferred.',
    jobGeo: 'Chicago, IL',
    companyName: 'ServerSide Solutions',
    url: 'https://www.linkedin.com/jobs/view/123456789',
    pubDate: '2022-01-01'
  }
]

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: [],
    siteJobs: [],
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

    fetchSiteJobs() {
      this.siteJobs = siteJobs
    }

    // async loadMoreJobs() {
    //   if (this.currentPage * this.resultsPerPage < this.totalResults) {
    //     await this.fetchJobs(query, this.currentPage + 1)
    //   }
    // }
  }
})
