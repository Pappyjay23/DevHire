<script setup>
import Logo from '@/assets/logo.svg'
import HeroBg from '@/assets/hero-bg.jpg'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
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
    title: 'Post Job',
    link: '/post-job'
  }
]

const isActiveLink = (link) => {
  const route = useRoute()
  return route.path === link
}

const isOpen = ref(false)
const toggleNav = () => (isOpen.value = !isOpen.value)
</script>

<template>
  <nav class="bg-[#127780] text-white border-b border-[#cdcdcd] fixed top-0 left-0 w-full z-30">
    <div class="max-w-[1200px] mx-auto flex justify-between p-4 items-center">
      <RouterLink to="/">
        <div class="flex gap-2 items-center cursor-pointer font-semibold">
          <img :src="Logo" alt="Logo" class="h-[40px] w-auto" />
          <h1 class="text-2xl">DevHire</h1>
        </div></RouterLink
      >

      <ul class="hidden lg:flex gap-4">
        <RouterLink v-for="item in navItems" :key="item" :to="item.link">
          <li
            class="cursor-pointer py-2 px-4 rounded-[4px] hover:bg-[#0d5258] transition-all duration-300 font-semibold"
            :class="isActiveLink(item.link) ? 'bg-[#0d5258]' : ''"
          >
            {{ item.title }}
          </li>
        </RouterLink>
      </ul>

      <div @click="toggleNav" class="cursor-pointer lg:hidden">
        <v-icon name="ri-menu-2-line" fill="#fff" scale="1.5" />
      </div>
    </div>
  </nav>
  <div
    class="absolute w-full left-0 h-screen bg-cover bg-center z-30 lg:hidden transition-all duration-700 text-white"
    :class="isOpen ? 'top-0 opacity-[1]' : 'top-[-100%] opacity-0'"
    :style="{ backgroundImage: `url(${HeroBg})` }"
  >
    <div class="p-4 z-50">
      <div class="flex justify-between items-center">
        <RouterLink to="/" @click="toggleNav">
          <div class="flex gap-2 items-center cursor-pointer font-semibold">
            <img :src="Logo" alt="Logo" class="h-[40px] w-auto" />
            <h1 class="text-2xl">DevHire</h1>
          </div></RouterLink
        >
        <v-icon
          class="cursor-pointer"
          @click="toggleNav"
          name="md-close-twotone"
          fill="#fff"
          scale="1.5"
        />
      </div>
      <ul class="flex flex-col gap-10 w-full items-center mt-[5rem]">
        <RouterLink v-for="item in navItems" :key="item" :to="item.link">
          <li
            @click="toggleNav"
            class="text-4xl cursor-pointer py-2 px-4 rounded-[4px] transition-all duration-300 font-semibold hover:transform hover:scale-[1.4]"
            :class="isActiveLink(item.link) ? 'transform scale-[1.4]' : ''"
          >
            {{ item.title }}
          </li>
        </RouterLink>
      </ul>
    </div>
    <div
      class="bg-[#000] absolute left-0 w-full h-screen transition-all duration-700 opacity-80 -z-10"
      :class="isOpen ? 'top-0' : 'top-[-100%]'"
    ></div>
  </div>
</template>

<style></style>
