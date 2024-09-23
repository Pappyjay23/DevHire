<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const formFieldStyles = 'border-b border-[#fff] p-2 outline-none text-[90%]'

defineProps({
  authType: String
})

const showPassword = ref(false)
const handleShowPassword = () => {
  showPassword.value = !showPassword.value
}

const authStore = useAuthStore()

const router = useRouter()

const handleLogin = async () => {
  await authStore.login()
  router.push('/')
}

const handleSignUp = async () => {
  await authStore.signUp()
  router.push('/')
}
</script>

<template>
  <div
    class="p-5 bg-transparent backdrop-blur flex justify-center w-full md:w-[80%] lg:w-[40%] mx-auto rounded-md border border-[#fff]"
  >
    <div class="text-[#fff] w-[80%]">
      <h1 class="text-2xl lg:text-3xl text-white font-bold text-center mb-3 lg:mb-4">
        {{ authType === 'login' ? 'Login' : 'Sign up' }}
      </h1>
      <form
        @submit.prevent="`${authType === 'login' ? handleLogin() : handleSignUp()}`"
        class="flex flex-col gap-4"
      >
        <input
          v-if="authType !== 'login'"
          type="text"
          name="username"
          id="username"
          :class="formFieldStyles"
          placeholder="Username"
        />
        <input type="email" name="email" id="email" :class="formFieldStyles" placeholder="Email" />
        <div class="flex w-full justify-between" :class="formFieldStyles">
          <input
            class="outline-none w-[80%]"
            :type="`${showPassword ? 'text' : 'password'}`"
            name="password"
            id="password"
            placeholder="Password"
          />
          <v-icon
            @click="handleShowPassword"
            class="cursor-pointer"
            v-if="showPassword"
            name="bi-eye-fill"
            scale="1.5"
          ></v-icon>
          <v-icon
            @click="handleShowPassword"
            class="cursor-pointer"
            v-else
            name="bi-eye-slash-fill"
            scale="1.5"
          ></v-icon>
        </div>
        <select
          v-if="authType !== 'login'"
          name="role"
          id="role"
          :class="formFieldStyles"
          class="cursor-pointer"
        >
          <option value="Select a role">Select a role</option>
          <option value="Developer">Developer</option>
          <option value="Employer">Employer</option>
        </select>

        <button
          class="py-3 px-8 rounded-[50px] w-[80%] md:w-[50%] mx-auto font-semibold bg-[#fff] text-[#127780] mt-5"
        >
          {{ authType === 'login' ? 'Login' : 'Sign up' }}
        </button>
      </form>
      <div class="mt-5 text-[70%] lg:text-[80%] text-center">
        <span>Don't have a DevHire account?</span>
        <RouterLink
          :to="`${authType === 'login' ? '/sign-up' : '/login'}`"
          class="font-semibold ml-2 text-[1rem]"
          >{{ authType === 'login' ? 'Sign up' : 'Login' }}</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
select,
select option,
textarea,
input,
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  background: transparent !important;
  -webkit-text-fill-color: white !important;
  caret-color: white !important;
  transition: background-color 5000s ease-in-out 0s;
}

::placeholder {
  color: white !important;
}

option {
  color: #127780 !important;
}
</style>
