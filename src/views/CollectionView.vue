<script setup lang="ts">
import navBarVue from '@/components/NavBar.vue'
import headerVue from '@/components/HeaderBar.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
const colList = ref<number[]>([])
for (var i = 1; i <= 30; i++) {
  colList.value.push(i)
}

const authStore = useAuthStore()
</script>
<template>
  <headerVue></headerVue>

  <div class="min-w-screen min-h-screen bg-bb-black lg:px-[16%] text-bb-white overflow-hidden pt-8">
    <!-- <div
      class="text-2xl font-semibold text-bb-white h-[8vh] justify-between bg-bb-black px-12 w-full"
    >
      <div class="flex flex-row justify-center w-full h-full">
        <p
          class="flex flex-row w-full my-auto text-2xl font-bold leading-none h-fit text-bb-red lg:w-auto"
        >
          {{ authStore.user == null ? 'not login' : authStore.user.username }}
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-[1.25rem] h-[1.25rem] ml-2 transition duration-300 hover:text-bb-white hover:scale-110"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
        </p>
      </div>
    </div> -->

    <div
      class="text-2xl font-semibold text-bb-white h-[12vh] justify-between bg-bb-black px-12 w-full"
    >
      <div class="flex flex-row justify-between w-full h-full border-b-2 border-bb-black-light">
        <p
          class="my-auto text-2xl w-[80%] font-semibold leading-none text-left h-fit text-bb-white lg:w-auto"
        >
          Your Collections
        </p>
        <button
          class="flex flex-col justify-center h-[60%] group px-2 rounded-lg my-auto transition duration-300 active:scale-90 hover:bg-bb-black-light"
        >
          <div class="flex flex-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 my-auto"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <p
              class="group-hover:ml-2 text-base duration-300 ease-in-out opacity-0 group-hover:max-w-fit transition-[max-width] group-hover:transition-[max-width] max-w-0 group-hover:opacity-100"
            >
              New Collection!
            </p>
          </div>
        </button>
      </div>
    </div>
    <div class="w-full h-full mx-auto py-8 lg:w-[90%]" v-if="colList.length != 0">
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <RouterLink
          :to="{ name: 'collectionInside' }"
          v-for="col in colList"
          :key="col"
          class="px-2 pt-2 pb-2 lg:pb-4 text-left transition duration-300 rounded-lg hover:bg-bb-black-light group active:scale-90 hover:scale-[1.05]"
        >
          <div class="flex flex-row h-[6rem] lg:h-[9rem] mb-2">
            <div class="w-[60%]">
              <img
                src="https://cf.geekdo-images.com/jAbc4LK0aCkV-JDLuZAmog__imagepagezoom/img/0eSIrSamdXQ1tIrXVtIoUfmtJCQ=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic7774173.jpg"
                class="object-cover object-right-top w-full h-full transition duration-300 border-r-2 rounded-tl-lg rounded-bl-lg group-hover:opacity-100 opacity-80 border-bb-black"
              />
            </div>
            <div class="w-[40%]">
              <div class="h-[50%]">
                <img
                  src="https://cf.geekdo-images.com/9cJf4kd_HZQo6NunfJlo9w__imagepagezoom/img/RTwSjC7brscqPjN-fQouXW8TV3w=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic175966.jpg"
                  class="object-cover object-right-top w-full h-full transition duration-300 border-b-2 border-l-2 rounded-tr-lg border-bb-black group-hover:opacity-100 opacity-80"
                />
              </div>
              <div class="h-[50%]">
                <img
                  src="https://cf.geekdo-images.com/A_XP2_VN3ugyqPhezowB_w__imagepagezoom/img/SzSyZ5xHRwz0gYOsXohJkczdri4=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8026369.png"
                  class="object-cover object-right-top w-full h-full transition duration-300 border-t-2 border-l-2 rounded-br-lg border-bb-black group-hover:opacity-100 opacity-80"
                />
              </div>
            </div>
          </div>
          <p class="text-base font-medium truncate lg:text-lg">Collections</p>
          <p class="text-xs">123 Games</p>
        </RouterLink>
      </div>
    </div>
    <div class="w-full h-[80vh] mx-auto py-8 lg:w-[90%]" v-else>
      <div class="flex flex-col justify-center h-full">
        <div class="flex flex-col items-center max-w-lg mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-32 h-32 mb-12"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <p class="mb-4 text-xl font-semibold">Your collections is empty!</p>
          <p class="mb-8 leading-relaxed">
            &emsp;Don't worry! You can start creating collections by using the top right button. You
            can also browse BoardBuddy for board games you would like to add to your collections by
            using the
            <span class="font-semibold">'Browse Board Games'</span> button below.
          </p>
          <RouterLink
            :to="{ name: 'home' }"
            class="inline-block px-5 py-3 text-sm font-medium text-white transition duration-300 rounded-lg bg-bb-red hover:bg-bb-orange"
          >
            Browse Board Games
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
  <navBarVue></navBarVue>
</template>
