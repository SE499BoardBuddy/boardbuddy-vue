<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const currentRouteName = computed(() => {
  return router.currentRoute
})
</script>
<template>
  <nav
    class="w-full pb-2 bg-bb-black h-[10vh] fixed bottom-0 right-0 left-0 lg:top-0 lg:w-1/6 lg:h-full lg:px-6 border-t-2 border-bb-black-light lg:border-r-2 lg:border-t-0"
  >
    <RouterLink :to="{ name: 'home' }" class="hidden w-full py-2 my-6 lg:flex"
      ><img src="../assets/logo-text-dark.svg" class="lg:h-[8vh]" />
    </RouterLink>
    <ul
      class="grid w-full h-full grid-cols-4 text-xs lg:text-base text-bb-white lg:grid-rows-4 lg:grid-cols-none lg:h-[30%]"
    >
      <li>
        <RouterLink
          :to="{ name: 'home' }"
          class="flex flex-col items-center justify-center h-full pt-2 text-center transition duration-300 ease-in-out border-t-2 rounded-none lg:rounded-lg lg:active:scale-90 group lg:pt-0 lg:px-4 hover:bg-bb-black-light lg:border-0 lg:justify-start border-bb-black-light lg:flex-row"
          active-class="text-bb-red border-bb-red lg:border-0 lg:font-semibold "
        >
          <svg
            v-if="currentRouteName.value.name == 'home'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"
            />
            <path
              d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>

          <p class="lg:ml-2">Home</p>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          :to="{ name: 'chat' }"
          class="flex flex-col items-center justify-center h-full pt-2 text-center transition duration-300 ease-in-out border-t-2 rounded-none lg:rounded-lg lg:active:scale-90 lg:pt-0 lg:px-4 hover:bg-bb-black-light lg:border-0 lg:justify-start border-bb-black-light lg:flex-row"
          active-class="text-bb-red border-bb-red lg:border-0 lg:font-semibold "
        >
          <svg
            v-if="currentRouteName.value.name == 'chat'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
              clip-rule="evenodd"
            />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
            />
          </svg>
          <p class="lg:ml-2">ChatBot</p>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          :to="{ name: 'collection' }"
          class="flex flex-col items-center justify-center h-full pt-2 text-center transition duration-300 ease-in-out border-t-2 rounded-none lg:rounded-lg lg:active:scale-90 lg:pt-0 lg:px-4 hover:bg-bb-black-light lg:border-0 lg:justify-start border-bb-black-light lg:flex-row"
          active-class="text-bb-red border-bb-red lg:border-0 lg:font-semibold "
        >
          <svg
            v-if="currentRouteName.value.name == 'collection'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z"
            />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            />
          </svg>
          <p class="lg:ml-2">Collections</p>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          :to="{ name: 'profile' }"
          class="flex flex-col items-center justify-center h-full pt-2 text-center transition duration-300 ease-in-out border-t-2 rounded-none lg:rounded-lg lg:active:scale-90 lg:pt-0 lg:px-4 hover:bg-bb-black-light lg:border-0 lg:justify-start border-bb-black-light lg:flex-row"
          active-class="text-bb-red border-bb-red lg:border-0 lg:font-semibold "
        >
          <svg
            v-if="currentRouteName.value.name == 'account'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clip-rule="evenodd"
            />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <p class="lg:ml-2">Account</p>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
