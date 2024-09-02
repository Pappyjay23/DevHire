<script setup>
import MarkdownIt from 'markdown-it'

defineProps({
  index: Number,
  title: String,
  type: String,
  workplace: String,
  description: String,
  location: String,
  experienceLevel: String,
  companyName: String,
  companyDescription: String,
  companyUrl: String,
  jobApplyUrl: String,
  jobListDate: String,
  buttonTitle: String
})

const truncateString = (str, num) => {
  if (str.length > num) {
    return str.slice(0, num) + '...'
  } else {
    return str
  }
}

const markdown = new MarkdownIt({
  breaks: true // Convert single newline characters to <br> tags
})
</script>

<template>
  <div
    class="bg-transparent backdrop-blur text-[#fff] border border-[#fff] px-5 py-10 rounded-[20px] w-full md:w-[40%] lg:w-[30%] flex flex-col gap-4 items-center shadow-md text-center"
  >
    <h2 class="text-xl font-semibold">
      {{ type }}
    </h2>
    <h2 class="text-2xl font-bold min-h-[100px]">
      {{ truncateString(title, 40) }}
    </h2>
    <h2 class="text-2xl font-bold">
      {{ workplace }}
    </h2>
    <p
      class="text-[90%] mb-2 leading-8 min-h-[100px]"
      v-html="truncateString(markdown.render(description), 100)"
    ></p>
    <div class="flex flex-col gap-4">
      <p class="font-semibold">
        <span><v-icon name="io-location-sharp"></v-icon></span>{{ location }}
      </p>
    </div>
    <RouterLink :to="`/jobs/${index + 1}`">
      <button
        class="py-3 px-8 rounded-[4px] font-semibold bg-white border border-[#fff] text-[#127780]"
      >
        {{ buttonTitle }}
      </button></RouterLink
    >
  </div>
</template>

<style></style>
