<script setup>
import { ref } from 'vue'
import JobsCard from './JobsCard.vue'
import { computed } from 'vue'

defineProps({
  limit: Number
})

const cards = ref([
  {
    title: 'Senior Vue Developer',
    type: 'Full-Time',
    description:
      'We are seeking a talented Senior Vue Developer to join our team. The ideal candidate will have strong skills in Vue.js, JavaScript, HTML, and CSS, with experience in building complex single-page applications.',
    location: 'Boston, MA',
    salary: '$120K - $150K',
    company: {
      name: 'TechInnovate Solutions',
      description:
        'TechInnovate Solutions is a leading software development company specializing in cutting-edge web applications.',
      contactEmail: 'careers@techinnovate.com',
      contactPhone: '617-555-0123'
    }
  },
  {
    title: 'Full Stack Developer',
    type: 'Full-Time',
    description:
      "We're looking for a Full Stack Developer proficient in both front-end and back-end technologies. Experience with Vue.js, Node.js, and database management is required.",
    location: 'San Francisco, CA',
    salary: '$100K - $130K',
    company: {
      name: 'WebStack Systems',
      description: 'WebStack Systems creates scalable web solutions for businesses of all sizes.',
      contactEmail: 'jobs@webstack.com',
      contactPhone: '415-555-0456'
    }
  },
  {
    title: 'UI/UX Designer',
    type: 'Contract',
    description:
      'Seeking a creative UI/UX Designer to help craft intuitive and visually appealing user interfaces for our web and mobile applications.',
    location: 'Remote',
    salary: '$70K - $90K',
    company: {
      name: 'DesignCraft Co.',
      description:
        'DesignCraft Co. is a digital agency focused on creating beautiful and functional digital experiences.',
      contactEmail: 'hello@designcraft.co',
      contactPhone: '800-555-0789'
    }
  },
  {
    title: 'DevOps Engineer',
    type: 'Full-Time',
    description:
      'We need a skilled DevOps Engineer to streamline our development and deployment processes. Experience with cloud platforms, CI/CD, and containerization is essential.',
    location: 'Seattle, WA',
    salary: '$110K - $140K',
    company: {
      name: 'CloudNine Technologies',
      description:
        'CloudNine Technologies specializes in cloud infrastructure and DevOps solutions.',
      contactEmail: 'recruitment@cloudnine.tech',
      contactPhone: '206-555-0321'
    }
  },
  {
    title: 'Mobile App Developer',
    type: 'Full-Time',
    description:
      'Join our mobile development team to create innovative iOS and Android applications. Proficiency in Swift and Kotlin is required.',
    location: 'Austin, TX',
    salary: '$90K - $120K',
    company: {
      name: 'MobileFirst Inc.',
      description:
        'MobileFirst Inc. is dedicated to developing cutting-edge mobile applications for diverse industries.',
      contactEmail: 'careers@mobilefirst.io',
      contactPhone: '512-555-0654'
    }
  },
  {
    title: 'Data Scientist',
    type: 'Full-Time',
    description:
      "We're seeking a Data Scientist to help us derive insights from our vast data sets. Strong background in statistics, machine learning, and data visualization is required.",
    location: 'New York, NY',
    salary: '$130K - $160K',
    company: {
      name: 'DataDrive Analytics',
      description:
        'DataDrive Analytics helps businesses make data-driven decisions through advanced analytics and machine learning.',
      contactEmail: 'join@datadrive.ai',
      contactPhone: '212-555-0987'
    }
  },
  {
    title: 'Backend Developer',
    type: 'Part-Time',
    description:
      'Looking for a Backend Developer to maintain and improve our server-side applications. Experience with Node.js, Express, and MongoDB is preferred.',
    location: 'Chicago, IL',
    salary: '$50K - $70K',
    company: {
      name: 'ServerSide Solutions',
      description:
        'ServerSide Solutions provides robust backend infrastructure for web and mobile applications.',
      contactEmail: 'hr@serverside.io',
      contactPhone: '312-555-0741'
    }
  },
  {
    title: 'QA Engineer',
    type: 'Full-Time',
    description:
      'We need a detail-oriented QA Engineer to ensure the quality of our software products. Experience with automated testing frameworks is a plus.',
    location: 'Denver, CO',
    salary: '$80K - $100K',
    company: {
      name: 'QualityFirst Software',
      description:
        'QualityFirst Software is committed to delivering bug-free, high-quality software solutions.',
      contactEmail: 'careers@qualityfirst.com',
      contactPhone: '303-555-0852'
    }
  },
  {
    title: 'Technical Writer',
    type: 'Contract',
    description:
      'Seeking a Technical Writer to create clear, concise documentation for our software products and APIs.',
    location: 'Remote',
    salary: '$60K - $80K',
    company: {
      name: 'DocuTech Systems',
      description:
        'DocuTech Systems specializes in creating comprehensive technical documentation for software companies.',
      contactEmail: 'jobs@docutech.com',
      contactPhone: '888-555-0963'
    }
  },
  {
    title: 'Product Manager',
    type: 'Full-Time',
    description:
      "We're looking for an experienced Product Manager to oversee the development and launch of new software products.",
    location: 'Los Angeles, CA',
    salary: '$110K - $140K',
    company: {
      name: 'ProductPro Labs',
      description:
        'ProductPro Labs helps companies bring innovative software products from concept to market.',
      contactEmail: 'careers@productpro.com',
      contactPhone: '213-555-0159'
    }
  }
])

const input = ref('')
const filteredJobs = computed(() => {
  return cards.value.filter((job) => {
    return job.title.toLowerCase().includes(input.value.toLowerCase())
  })
})
</script>

<template>
  <section class="p-5 bg-[#127780] text-center">
    <h1 class="mb-5 text-3xl text-white font-bold">Browse Jobs</h1>
    <input
      class="mb-5 w-full lg:w-2/4 p-2 rounded-md outline-none border-0 text-[90%] text-[#127780]"
      placeholder="Search jobs by title"
      v-if="!limit"
      type="search"
      v-model="input"
    />
    <div class="flex gap-4 w-full justify-center flex-wrap">
      <JobsCard
        v-for="card in filteredJobs.slice(0, limit || filteredJobs.length)"
        :key="card"
        :title="card.title"
        :type="card.type"
        :description="card.description"
        :location="card.location"
        :salary="card.salary"
        :companyName="card.company.name"
        :companyDescription="card.company.description"
        :companyEmail="card.company.contactEmail"
        :companyPhone="card.company.contactPhone"
        buttonTitle="Read More"
      />
    </div>
    <RouterLink to="/jobs">
      <button
        v-if="limit"
        class="bg-[#fff] text-[#127780] py-3 px-8 rounded-[4px] font-semibold mt-5"
      >
        View All
      </button></RouterLink
    >
  </section>
</template>
