<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const username = ref('')
const password = ref('')

function register() {
  authStore.register(email.value, username.value, password.value).then(
    (res) => {
      if (res.status != 201) {
        alert(res.data.message)
      } else {
        router.push({ name: 'home' })
      }
    }
    // (reject) => {
    //   console.log(reject)
    // }
  )
}
</script>

<template>
  <div class="flex flex-col justify-center min-h-screen bg-bb-black min-w-screen">
    <div class="rounded-lg bg-bb-black-light text-bb-white lg:w-[40%] w-[90%] px-4 py-16 mx-auto">
      <RouterLink :to="{ name: 'home' }" class="">
        <img src="../assets/logo-text-dark.svg" class="max-w-md mx-auto mb-8" />
      </RouterLink>
      <div class="max-w-lg mx-auto text-center">
        <h1 class="text-2xl font-bold sm:text-3xl text-bb-white">
          Start chatting with BoardBuddy free!
        </h1>

        <p class="mt-4 text-bb-white">Please enter your details</p>
      </div>

      <form @submit.prevent="register" class="max-w-md mx-auto mt-8 mb-0 space-y-4">
        <div>
          <label for="email" class="sr-only">Email</label>

          <div class="relative">
            <input
              v-model="email"
              required
              type="email"
              class="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12 text-bb-black"
              placeholder="Enter email"
            />

            <span class="absolute inset-y-0 grid px-4 end-0 place-content-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-gray-400 size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label for="username" class="sr-only">Username</label>

          <div class="relative">
            <input
              v-model="username"
              required
              type="username"
              class="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12 text-bb-black"
              placeholder="Enter username"
            />

            <span class="absolute inset-y-0 grid px-4 end-0 place-content-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-gray-400 size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label for="password" class="sr-only">Password</label>

          <div class="relative">
            <input
              v-model="password"
              required
              type="password"
              class="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12 text-bb-black"
              placeholder="Enter password"
            />

            <span class="absolute inset-y-0 grid px-4 end-0 place-content-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-gray-400 size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <p class="text-sm text-bb-white">
            Already got an account?
            <RouterLink
              :to="{ name: 'signin' }"
              class="underline transition duration-300 text-bb-red hover:text-bb-orange"
              href="#"
              >Sign In</RouterLink
            >
          </p>

          <button
            type="submit"
            class="inline-block px-5 py-3 text-sm font-medium text-white transition duration-300 rounded-lg bg-bb-red hover:bg-bb-orange active:bg-bb-maroon"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
