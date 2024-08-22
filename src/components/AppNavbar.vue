<script setup>
import Logo from '@/assets/logo.svg'
const navItems = ['Home', 'Jobs', 'Add job']
</script>

<template>
  <nav class="flex justify-between p-4 items-center bg-[#127780] text-white">
    <div class="flex gap-2 items-center cursor-pointer">
      <img :src="Logo" alt="Logo" class="h-[40px] w-auto" />
      <h1 class="text-2xl">DevHire</h1>
    </div>
    <ul class="flex gap-4">
      <li
        class="cursor-pointer py-2 px-4 rounded-[4px] hover:bg-[#0d5258] transition-all duration-300"
        v-for="item in navItems"
        :key="item"
      >
        {{ item }}
      </li>
    </ul>
  </nav>
</template>

<style></style>
