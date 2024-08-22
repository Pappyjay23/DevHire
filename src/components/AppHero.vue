<script setup>
defineProps({
  title: String,
  description: String
})
</script>

<template>
  <section class="flex justify-center items-center bg-[#127780] h-[50vh] text-white">
    <div class="text-center flex flex-col gap-3 w-[50%]">
      <h1 class="text-5xl font-semibold">{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
  </section>
</template>

<style></style>
