<script setup>
import { defineProps, defineEmits } from 'vue'
import PulseLoader from 'vue-spinner/src/ClipLoader.vue'

defineProps({
  isVisible: {
    type: Boolean,
    required: true
  },
  isLoading: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const confirm = () => {
  emit('confirm')
}

const cancel = () => {
  emit('cancel')
}

const color = '#fff'
const size = '25px'
</script>

<template>
  <div v-if="isVisible" class="overlay">
    <div class="dialog flex flex-col items-center">
      <p>Are you sure you want to delete this job?</p>
      <div class="flex gap-3 mt-4">
        <button
          class="bg-[#127780] text-white px-4 py-2 rounded-[4px] min-w-[85px]"
          @click="confirm"
        >
          <PulseLoader v-if="isLoading" :color="color" :size="size" />
          <span v-else> Confirm </span>
        </button>
        <button class="bg-red-600 text-white px-4 py-2 rounded-[4px]" @click="cancel">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog {
  background: white;
  color: black;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
