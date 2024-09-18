import { defineStore } from 'pinia'
import axios from 'axios'

const siteJobs = [
  {
    title: 'Backend Developer',
    employmentType: 'Part-Time',
    description:
      'Looking for a Backend Developer to maintain and improve our server-side applications. Experience with Node.js, Express, and MongoDB is preferred.Looking for a Backend Developer to maintain and improve our server-side applications. Experience with Node.js, Express, and MongoDB is preferred.Looking for a Backend Developer to maintain and improve our server-side applications. Experience with Node.js, Express, and MongoDB is preferred.',
    location: 'Chicago, IL',
    company: 'ServerSide Solutions',
    url: 'https://www.linkedin.com/jobs/view/123456789',
    datePosted: '2022-01-01'
  },
  {
    title: 'Frontend Developer',
    employmentType: 'Part-Time',
    description:
      'Looking for a Frontend Developer to maintain and improve our server-side applications. Experience with Node.js, Express, and MongoDB is preferred.Looking for a Backend Developer to maintain and improve our server-side applications. Experience with Node.js, Express, and MongoDB is preferred.Looking for a Backend Developer to maintain and improve our server-side applications. Experience with Node.js, Express, and MongoDB is preferred.',
    location: 'Chicago, IL',
    company: 'ServerSide Solutions',
    url: 'https://www.linkedin.com/jobs/view/123456789',
    datePosted: '2022-01-01'
  },
  {
    title: 'Full-Stack Developer',
    employmentType: 'Part-Time',
    description:
      'Looking for a Full-Stack Developer to maintain and improve our server-side applications. Experience with Node.js, Express, and MongoDB is preferred.Looking for a Backend Developer to maintain and improve our server-side applications. Experience with Node.js, Express, and MongoDB is preferred.Looking for a Backend Developer to maintain and improve our server-side applications. Experience with Node.js, Express, and MongoDB is preferred.',
    location: 'Chicago, IL',
    company: 'ServerSide Solutions',
    url: 'https://www.linkedin.com/jobs/view/123456789',
    datePosted: '2022-01-01'
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

      // try {
      //   const response = await axios.get('https://jobicy.com/api/v2/remote-jobs', {
      //     params: {
      //       count: 20,
      //       geo: 'usa',
      //       industry: 'engineering'
      //     }
      //   })

      const options = {
        method: 'GET',
        url: 'https://jobs-api14.p.rapidapi.com/list',
        params: {
          query: 'Web Developer',
          location: 'United States',
          distance: '1.0',
          language: 'en_GB',
          remoteOnly: 'false',
          datePosted: 'month',
          employmentTypes: 'fulltime;parttime;intern;contractor',
          index: '0'
        },
        headers: {
          'x-rapidapi-key': '6e83667247mshd69d9d7f98a5cd9p110252jsne2b73f83ca2b',
          'x-rapidapi-host': 'jobs-api14.p.rapidapi.com'
        }
      }

      try {
        const response = await axios.request(options)
        console.log(response.data)

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
