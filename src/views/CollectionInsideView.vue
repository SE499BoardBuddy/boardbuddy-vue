<script setup lang="ts">
import navBarVue from '@/components/NavBar.vue'
import headerVue from '@/components/HeaderBar.vue'
import { ref } from 'vue'
const colList = ref<number[]>([])
for (var i = 1; i <= 30; i++) {
  colList.value.push(i)
}
</script>
<template>
  <headerVue></headerVue>

  <div class="min-w-screen min-h-screen bg-bb-black lg:px-[16%] text-bb-white overflow-hidden">
    <div
      class="text-2xl font-semibold text-bb-white h-[12vh] justify-between bg-bb-black px-12 w-full"
    >
      <div class="flex flex-row justify-between w-full h-full border-b-2 border-bb-black-light">
        <RouterLink
          :to="{ name: 'chat' }"
          class="w-[10%] flex justify-center my-auto p-2 lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </RouterLink>
        <p
          class="my-auto text-2xl w-[80%] font-semibold leading-none text-left h-fit text-bb-white lg:w-auto"
        >
          Name Here
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
    <div class="w-full h-full mx-auto py-8 lg:w-[90%]">
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <RouterLink
          :to="{ name: 'product' }"
          v-for="col in colList"
          :key="col"
          class="px-2 pt-2 pb-2 lg:pb-4 text-left transition duration-300 rounded-lg hover:bg-bb-black-light group active:scale-90 hover:scale-[1.05]"
        >
          <div class="flex flex-row h-[6rem] lg:h-[9rem] mb-2">
            <div class="w-full">
              <img
                src="https://cf.geekdo-images.com/jAbc4LK0aCkV-JDLuZAmog__imagepagezoom/img/0eSIrSamdXQ1tIrXVtIoUfmtJCQ=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic7774173.jpg"
                class="object-cover object-right-top w-full h-full transition duration-300 border-r-2 rounded-tl-lg rounded-bl-lg group-hover:opacity-100 opacity-80 border-bb-black"
              />
            </div>
          </div>
          <p class="text-base font-medium truncate lg:text-lg">Game Name Here</p>
        </RouterLink>
      </div>
    </div>
  </div>
  <navBarVue></navBarVue>
</template>
