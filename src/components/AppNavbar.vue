<script setup>
import Logo from '@/assets/logo.svg'
import MobileNavBg from '@/assets/job-bg.jpg'
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

const isActiveLink = (link) => {
  const route = useRoute()
  return route.path === link
}

const allNavItems = [
  { title: 'Home', link: '/', showAlways: true },
  { title: 'Jobs', link: '/jobs', requiresAuth: true },
  { title: 'Post Job', link: '/post-job', requiresAuth: true },
  { title: 'Login', link: '/login', requiresAuth: false },
  { title: 'Sign up', link: '/sign-up', requiresAuth: false }
]

const navItems = computed(() => {
  return allNavItems.filter(
    (item) =>
      item.showAlways ||
      (authStore.isLoggedIn && item.requiresAuth) ||
      (!authStore.isLoggedIn && item.requiresAuth === false)
  )
})

const allMobileNavItems = [
  { title: 'Home', link: '/', showAlways: true },
  { title: 'Jobs', link: '/jobs', requiresAuth: true },
  { title: 'Post Job', link: '/post-job', requiresAuth: true },
  { title: 'Login', link: '/login', requiresAuth: false },
  { title: 'Sign up', link: '/sign-up', requiresAuth: false },
  { title: 'Dashboard', link: '/dashboard', requiresAuth: true },
  { title: 'Logout', link: '', requiresAuth: true, clickFunction: handleLogout }
]

const mobileNavItems = computed(() => {
  return allMobileNavItems.filter(
    (item) =>
      item.showAlways ||
      (authStore.isLoggedIn && item.requiresAuth) ||
      (!authStore.isLoggedIn && item.requiresAuth === false)
  )
})

const handleClickFunction = (clickFunction) => {
  isOpen.value = !isOpen.value
  if (clickFunction) {
    clickFunction()
  }
}

const isOpen = ref(false)
const toggleNav = () => (isOpen.value = !isOpen.value)

const showDropdown = ref(false)

const handleMouseOver = () => {
  showDropdown.value = true
}

const handleMouseLeave = () => {
  showDropdown.value = false
}
</script>

<template>
  <nav class="bg-[#127780] text-white border-b border-[#cafbff] fixed top-0 left-0 w-full z-[20]">
    <div class="max-w-[1200px] mx-auto flex justify-between p-4 items-center relative">
      <RouterLink to="/">
        <div class="flex gap-2 items-center cursor-pointer font-semibold">
          <img :src="Logo" alt="Logo" class="h-[30px] lg:h-[40px] w-auto" />
          <h1 class="text-[1.3rem] lg:text-2xl">DevHire</h1>
        </div></RouterLink
      >

      <ul class="hidden lg:flex items-center gap-4">
        <RouterLink v-for="item in navItems" :key="item" :to="item.link">
          <li
            class="cursor-pointer py-2 px-4 rounded-[4px] hover:bg-[#0d5258] transition-all duration-300 font-semibold"
            :class="isActiveLink(item.link) ? 'bg-[#0d5258]' : ''"
          >
            {{ item.title }}
          </li>
        </RouterLink>
        <li
          v-if="authStore.isLoggedIn"
          class="cursor-pointer py-2 px-4 rounded-[4px] bg-[#0b4449] transition-all duration-300 font-semibold text-[1.1rem]"
          @mouseover="handleMouseOver"
          @mouseleave="handleMouseLeave"
        >
          Pa
        </li>
      </ul>
      <ul
        v-if="authStore.isLoggedIn"
        :class="`absolute right-4 top-[4rem] flex flex-col items-end bg-[#0b4449] rounded-[4px] transition-all duration-300 overflow-hidden ${showDropdown ? 'opacity-100 visible' : 'opacity-0 invisible'}`"
        @mouseover="handleMouseOver"
        @mouseleave="handleMouseLeave"
      >
        <RouterLink to="/dashboard">
          <li
            @click="handleMouseLeave"
            :class="`font-semibold p-4 hover:bg-[#0d292c] ${isActiveLink('/dashboard') ? 'bg-[#072b2e]' : ''}`"
          >
            Dashboard
          </li>
        </RouterLink>
        <li
          class="font-semibold p-4 cursor-pointer hover:bg-[#0d292c] w-full text-center"
          @click="handleLogout"
        >
          Logout
        </li>
      </ul>

      <div class="lg:hidden">
        <v-icon
          @click="toggleNav"
          class="cursor-pointer"
          name="ri-menu-2-line"
          fill="#fff"
          scale="1.5"
        />
      </div>
    </div>
  </nav>
  <div
    class="fixed w-full left-0 h-screen bg-cover bg-center lg:hidden transition-all duration-700 text-white z-[40]"
    :class="isOpen ? 'top-0 opacity-[1]' : 'top-[-2000px] opacity-1'"
    :style="{ backgroundImage: `url(${MobileNavBg})` }"
  >
    <div class="p-4 z-50 backdrop-blur h-full">
      <div class="flex justify-between items-center">
        <RouterLink to="/" @click="toggleNav">
          <div class="flex gap-2 items-center cursor-pointer font-semibold">
            <img :src="Logo" alt="Logo" class="h-[30px] lg:h-[40px] w-auto" />
            <h1 class="text-[1.3rem] lg:text-2xl">DevHire</h1>
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
        <RouterLink v-for="item in mobileNavItems" :key="item" :to="item.link">
          <li
            @click="handleClickFunction(item.clickFunction)"
            class="text-3xl cursor-pointer py-2 px-4 rounded-[4px] transition-all duration-300 font-semibold hover:transform hover:scale-[1.4]"
            :class="isActiveLink(item.link) ? 'transform scale-[1.4]' : ''"
          >
            {{ item.title }}
          </li>
        </RouterLink>
      </ul>
    </div>
    <div
      class="bg-[#000] fixed left-0 w-full h-screen transition-all duration-700 opacity-40 -z-10"
      :class="isOpen ? 'top-0' : 'top-[-2000px]'"
    ></div>
  </div>
</template>

<style></style>
