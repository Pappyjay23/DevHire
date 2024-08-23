<script setup>
import Logo from '@/assets/logo.svg'
const navItems = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: 'Jobs',
    link: '/jobs'
  },
  {
    title: 'Add Job',
    link: '/add-job'
  }
]
</script>

<template>
  <nav class="bg-[#127780] text-white border-b border-[#cdcdcd] fixed top-0 left-0 w-full z-50">
    <div class="max-w-[1200px] mx-auto flex justify-between p-4 items-center">
      <RouterLink to="/">
        <div class="flex gap-2 items-center cursor-pointer font-semibold">
          <img :src="Logo" alt="Logo" class="h-[40px] w-auto" />
          <h1 class="text-2xl">DevHire</h1>
        </div></RouterLink
      >
      <ul class="flex gap-4">
        <RouterLink v-for="item in navItems" :key="item" :to="item.link">
          <li
            class="cursor-pointer py-2 px-4 rounded-[4px] hover:bg-[#0d5258] transition-all duration-300 font-semibold"
          >
            {{ item.title }}
          </li>
        </RouterLink>
      </ul>
    </div>
  </nav>
</template>

<style></style>
