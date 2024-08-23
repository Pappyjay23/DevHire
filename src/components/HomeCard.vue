<script setup>
defineProps({
  title: String,
  description: String,
  buttonTitle: String,
  isDeveloper: Boolean,
  link: String
})
</script>

<template>
  <div
    :class="isDeveloper ? 'bg-[#fff] text-[#127780]' : 'bg-[#127780] text-[#fff]'"
    class="px-5 py-10 rounded-[4px] w-[30%] flex flex-col gap-4 items-center shadow-md"
  >
    <h2 class="text-2xl font-bold">
      {{ title }}
    </h2>
    <p class="text-[90%]">{{ description }}</p>
    <RouterLink :to="link">
      <button
        :class="isDeveloper ? 'bg-[#127780] text-[#fff]' : 'bg-[#fff] text-[#127780]'"
        class="py-3 px-8 rounded-[4px] font-semibold"
      >
        {{ buttonTitle }}
      </button></RouterLink
    >
  </div>
</template>

<style></style>
