<script setup lang="ts">
import navBarVue from '@/components/NavBar.vue'
import headerVue from '@/components/HeaderBar.vue'
import { ref } from 'vue'
const chatList = ref<number[]>([])
// for (var i = 1; i <= 30; i++) {
//   chatList.value.push(i)
// }
</script>
<template>
  <headerVue></headerVue>
  <div
    class="w-full h-full bg-bb-black pt-[8vh] pb-[10vh] lg:pt-0 lg:pb-0 lg:pl-[17%] text-bb-white overflow-hidden"
  >
    <div class="w-full h-full px-4 pb-2 pt-2 lg:pt-8 lg:w-[90%] mx-auto">
      <p
        class="text-2xl font-semibold text-bb-white h-[10%] border-b-2 border-bb-black-light text-left align-middle leading-loose"
      >
        Chat with BoardBuddy
      </p>
      <div
        v-if="chatList.length == 0"
        class="flex flex-col items-center justify-center lg:justify-start lg:mt-[10%] w-full h-[90%]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-32 h-32 mb-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
          />
        </svg>
        <p class="mb-2 text-xl font-semibold">Start Chatting Now!</p>
        <div class="mb-8 text-base w-[90%] text-center">
          You can start chatting with BoardBuddy about various topics regarding your rulebook now!
        </div>
        <RouterLink
          :to="{ name: 'chatting' }"
          class="text-center p-4 mx-auto rounded-lg h-fit bg-bb-red w-[80%] font-medium md:w-[60%]"
        >
          Chat Now
        </RouterLink>
      </div>
      <ul class="w-[90%] lg:w-[70%] h-[70%] overflow-x-hidden overflow-y-auto mx-auto">
        <li
          v-for="chat in chatList"
          :key="chat"
          class="w-full p-2 my-2 text-lg border-b-2 border-bb-black-light"
        >
          <RouterLink
            :to="{ name: 'chatting' }"
            class="flex flex-row items-center transition active:scale-95"
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
            <div class="w-[90%] pl-2 text-left">
              <p class="font-medium truncate">Some chat from whenever and from somewhere</p>
              <p class="text-xs opacity-60">00.00 6/5/2567</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <div class="h-[20%] flex items-center" v-if="chatList.length != 0">
        <RouterLink
          :to="{ name: 'chatting' }"
          class="p-4 mx-auto rounded-lg h-fit bg-bb-red w-[80%] font-medium text-center lg:w-[60%]"
        >
          New Chat!
        </RouterLink>
      </div>
    </div>
  </div>
  <navBarVue></navBarVue>
</template>
