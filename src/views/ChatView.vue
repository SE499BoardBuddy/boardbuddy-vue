<script setup lang="ts">
import navBarVue from '@/components/NavBar.vue'
import headerVue from '@/components/HeaderBar.vue'
import { ref } from 'vue'
const chatList = ref([0])
for (var i = 1; i <= 30; i++) {
  chatList.value.push(i)
}
</script>
<template>
  <headerVue></headerVue>
  <div
    class="w-full h-full bg-bb-black pt-[8vh] pb-[10vh] lg:pt-0 lg:pb-0 lg:pl-[17%] text-bb-white overflow-hidden"
  >
    <div class="w-full h-full px-4 py-2">
      <p class="text-2xl font-semibold text-bb-white h-[10%]">Chat with BoardBuddy</p>
      <div class="h-[10%] flex flex-center">
        <button class="p-2 mx-auto rounded-lg bg-bb-red">New Chat!</button>
      </div>
      <ul class="w-full h-[80%] overflow-x-hidden overflow-y-auto">
        <li
          v-for="chat in chatList"
          :key="chat"
          class="flex flex-row items-center w-full my-4 text-lg"
        >
          <div class="w-[10%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
              />
            </svg>
          </div>
          <div class="w-[90%] pl-2">
            <p class="font-medium truncate">Some chat from whenever and from somewhere</p>
            <p class="text-xs opacity-60">00.00 6/5/2567</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <navBarVue></navBarVue>
</template>
