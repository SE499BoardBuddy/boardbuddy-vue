<script setup lang="ts">
import headerVue from '@/components/HeaderBar.vue'
import navBarVue from '@/components/NavBar.vue'
import { ref } from 'vue'
const games = ref([0, 1, 2, 3, 4, 5])
</script>
<template>
  <headerVue></headerVue>
  <div
    class="lg:z-10 font-semibold text-bb-white h-[10%] lg:h-[12%] justify-between bg-bb-black absolute lg:fixed px-2 lg:px-12 top-[8vh] lg:top-0 w-full lg:w-[68%] left-0 lg:left-[16%] flex flex-row"
  >
    <p
      class="w-auto my-auto text-xl font-semibold text-center lg:leading-none lg:text-left lg:text-2xl h-fit text-bb-white"
    >
      Choose which board game to ask with BoardBuddy!
    </p>
  </div>
  <div
    class="min-w-screen min-h-screen bg-bb-black pb-[10vh] pt-[18vh] lg:pt-[10vh] lg:pb-[15vh] lg:px-[16%] text-bb-white overflow-hidden"
  >
    <div class="py-4 lg:px-0 px-2 lg:w-[90%] lg:mx-auto grid grid-cols-2 lg:grid-cols-3 gap-4">
      <RouterLink
        :to="{ name: 'chatting' }"
        class="p-2 truncate transition duration-300 rounded-lg lg:h-64 group bg-bb-black hover:bg-bb-black-light hover:scale-105"
        v-for="game in games"
        :key="game"
      >
        <div class="w-full mb-2 h-4/5">
          <img
            src="https://cf.geekdo-images.com/jAbc4LK0aCkV-JDLuZAmog__imagepagezoom/img/0eSIrSamdXQ1tIrXVtIoUfmtJCQ=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic7774173.jpg"
            class="object-cover object-right-top w-full h-full transition duration-300 border-r-2 rounded-lg group-hover:opacity-100 opacity-80 border-bb-black"
          />
        </div>
        <span class="w-full text-xl font-semibold">Game {{ game }}</span>
      </RouterLink>
    </div>
  </div>
  <div
    class="lg:flex fixed hidden top-0 right-0 h-full w-[16%] bg-bb-black border-l-2 pr-2 border-bb-black-light text-bb-white flex-col"
  >
    <div class="w-full pl-4 h-[12%] text-lg font-medium flex flex-col justify-center">
      All Chats
    </div>
    <div class="flex flex-col">
      <div class="py-2 pl-4 font-medium">7/5/2567</div>
      <a
        href=""
        class="flex flex-col justify-center h-12 px-4 text-sm transition duration-300 border-l-4 rounded-tr-lg rounded-br-lg active:scale-90 group hover:bg-bb-black-light hover:border-bb-red border-bb-black"
      >
        <div class="flex flex-row">
          <div class="truncate">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras odio elit, semper eget
            lacinia vitae, bibendum eu urna. Proin venenatis lobortis diam, vitae mollis libero
            lacinia ac. Suspendisse cursus eget sapien in varius.
          </div>
          <div class="p-1 rounded hover:bg-bb-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            </svg>
          </div>
        </div>
      </a>
      <a
        href=""
        class="flex flex-col justify-center h-12 px-4 text-sm transition duration-300 border-l-4 rounded-tr-lg rounded-br-lg active:scale-90 group hover:bg-bb-black-light hover:border-bb-red border-bb-black"
      >
        <div class="flex flex-row">
          <div class="truncate">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras odio elit, semper eget
            lacinia vitae, bibendum eu urna. Proin venenatis lobortis diam, vitae mollis libero
            lacinia ac. Suspendisse cursus eget sapien in varius.
          </div>
          <div class="p-1 rounded hover:bg-bb-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            </svg>
          </div>
        </div>
      </a>
      <a
        href=""
        class="flex flex-col justify-center h-12 px-4 text-sm transition duration-300 border-l-4 rounded-tr-lg rounded-br-lg active:scale-90 group hover:bg-bb-black-light hover:border-bb-red border-bb-black"
      >
        <div class="flex flex-row">
          <div class="truncate">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras odio elit, semper eget
            lacinia vitae, bibendum eu urna. Proin venenatis lobortis diam, vitae mollis libero
            lacinia ac. Suspendisse cursus eget sapien in varius.
          </div>
          <div class="p-1 rounded hover:bg-bb-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            </svg>
          </div>
        </div>
      </a>
    </div>
    <div class="flex flex-col">
      <div class="py-2 pl-4 font-medium">7/5/2567</div>
      <a
        href=""
        class="flex flex-col justify-center h-12 px-4 text-sm transition duration-300 border-l-4 rounded-tr-lg rounded-br-lg active:scale-90 group hover:bg-bb-black-light hover:border-bb-red border-bb-black"
      >
        <div class="flex flex-row">
          <div class="truncate">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras odio elit, semper eget
            lacinia vitae, bibendum eu urna. Proin venenatis lobortis diam, vitae mollis libero
            lacinia ac. Suspendisse cursus eget sapien in varius.
          </div>
          <div class="p-1 rounded hover:bg-bb-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            </svg>
          </div>
        </div>
      </a>
      <a
        href=""
        class="flex flex-col justify-center h-12 px-4 text-sm transition duration-300 border-l-4 rounded-tr-lg rounded-br-lg active:scale-90 group hover:bg-bb-black-light hover:border-bb-red border-bb-black"
      >
        <div class="flex flex-row">
          <div class="truncate">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras odio elit, semper eget
            lacinia vitae, bibendum eu urna. Proin venenatis lobortis diam, vitae mollis libero
            lacinia ac. Suspendisse cursus eget sapien in varius.
          </div>
          <div class="p-1 rounded hover:bg-bb-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            </svg>
          </div>
        </div>
      </a>
      <a
        href=""
        class="flex flex-col justify-center h-12 px-4 text-sm transition duration-300 border-l-4 rounded-tr-lg rounded-br-lg active:scale-90 group hover:bg-bb-black-light hover:border-bb-red border-bb-black"
      >
        <div class="flex flex-row">
          <div class="truncate">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras odio elit, semper eget
            lacinia vitae, bibendum eu urna. Proin venenatis lobortis diam, vitae mollis libero
            lacinia ac. Suspendisse cursus eget sapien in varius.
          </div>
          <div class="p-1 rounded hover:bg-bb-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            </svg>
          </div>
        </div>
      </a>
    </div>
  </div>
  <navBarVue class=""></navBarVue>
</template>
