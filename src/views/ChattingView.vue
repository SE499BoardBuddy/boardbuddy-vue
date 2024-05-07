<script setup lang="ts">
import headerVue from '@/components/HeaderBar.vue'
import navBarVue from '@/components/NavBar.vue'
import { ref } from 'vue'
const isUploaded = ref(true)
</script>
<template>
  <headerVue></headerVue>
  <div class="w-full h-full bg-bb-black pt-[8vh] lg:pt-0 lg:pl-[17%] text-bb-white overflow-hidden">
    <div class="w-full h-full px-4 pt-2 lg:pt-8 pb-2 lg:w-[90%] lg:mx-auto">
      <div
        class="text-2xl font-semibold text-bb-white h-[10%] border-b-2 border-bb-black-light flex flex-row"
      >
        <RouterLink :to="{ name: 'chat' }" class="w-[10%] flex justify-center my-auto p-2">
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
        <span class="w-[80%] text-center align-middle leading-loose">Chat with BoardBuddy</span>
        <div class="w-[10%]"></div>
      </div>
      <div class="text-sm h-[75%] overflow-x-hidden overflow-y-auto pt-4 lg:pt-12">
        <div
          v-if="!isUploaded"
          class="flex items-center justify-center w-full lg:max-w-[75%] lg:mx-auto"
        >
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer text-bb-white border-bb-white bg-bb-black-light hover:bg-bb-maroon"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
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
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>

              <p class="px-6 mt-4 mb-2 text-sm leading-relaxed text-center text-bb-white">
                <span class="font-semibold">Click to upload</span> or drag and drop your rulebook
                pdf here!
              </p>
            </div>
            <input id="dropzone-file" type="file" class="hidden" />
          </label>
        </div>
        <ul v-else class="lg:px-8">
          <li class="flex flex-col mb-8 justify-left">
            <div class="flex flex-row mb-2">
              <div class="w-8 h-8 rounded-full bg-slate-600"></div>
              <div class="ml-2 font-semibold leading-loose align-middle">BoardBuddy</div>
            </div>
            <div
              class="p-4 mb-2 rounded-tr-lg rounded-bl-lg rounded-br-lg bg-bb-black-light lg:w-[80%]"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras odio elit, semper eget
              lacinia vitae, bibendum eu urna. Proin venenatis lobortis diam, vitae mollis libero
              lacinia ac. Suspendisse cursus eget sapien in varius.
            </div>
            <div class="text-xs">00.00 6/5/2567</div>
          </li>
          <li class="flex flex-col mb-8">
            <div
              class="p-4 mb-2 rounded-tl-lg rounded-bl-lg rounded-br-lg bg-bb-maroon lg:w-[80%] lg:ml-auto"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras odio elit, semper eget
              lacinia vitae, bibendum eu urna. Proin venenatis lobortis diam, vitae mollis libero
              lacinia ac. Suspendisse cursus eget sapien in varius.
            </div>
            <div class="text-xs text-right">00.00 6/5/2567</div>
          </li>
          <li class="flex flex-col mb-8 justify-left">
            <div class="flex flex-row mb-2">
              <div class="w-8 h-8 rounded-full bg-slate-600"></div>
              <div class="ml-2 font-semibold leading-loose align-middle">BoardBuddy</div>
            </div>
            <div
              class="p-4 mb-2 rounded-tr-lg rounded-bl-lg rounded-br-lg bg-bb-black-light lg:w-[80%]"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras odio elit, semper eget
              lacinia vitae, bibendum eu urna. Proin venenatis lobortis diam, vitae mollis libero
              lacinia ac. Suspendisse cursus eget sapien in varius.
            </div>
            <div class="text-xs">00.00 6/5/2567</div>
          </li>
          <li class="flex flex-col mb-8">
            <div
              class="p-4 mb-2 rounded-tl-lg rounded-bl-lg rounded-br-lg bg-bb-maroon lg:w-[80%] lg:ml-auto"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras odio elit, semper eget
              lacinia vitae, bibendum eu urna. Proin venenatis lobortis diam, vitae mollis libero
              lacinia ac. Suspendisse cursus eget sapien in varius.
            </div>
            <div class="text-xs text-right">00.00 6/5/2567</div>
          </li>
          <li class="flex flex-col mb-8 justify-left">
            <div class="flex flex-row mb-2">
              <div class="w-8 h-8 rounded-full bg-slate-600"></div>
              <div class="ml-2 font-semibold leading-loose align-middle">BoardBuddy</div>
            </div>
            <div
              class="p-4 mb-2 rounded-tr-lg rounded-bl-lg rounded-br-lg bg-bb-black-light lg:w-[80%]"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras odio elit, semper eget
              lacinia vitae, bibendum eu urna. Proin venenatis lobortis diam, vitae mollis libero
              lacinia ac. Suspendisse cursus eget sapien in varius.
            </div>
            <div class="text-xs">00.00 6/5/2567</div>
          </li>
          <li class="flex flex-col mb-8">
            <div
              class="p-4 mb-2 rounded-tl-lg rounded-bl-lg rounded-br-lg bg-bb-maroon lg:w-[80%] lg:ml-auto"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras odio elit, semper eget
              lacinia vitae, bibendum eu urna. Proin venenatis lobortis diam, vitae mollis libero
              lacinia ac. Suspendisse cursus eget sapien in varius.
            </div>
            <div class="text-xs text-right">00.00 6/5/2567</div>
          </li>
        </ul>
      </div>
      <div class="flex p-4 border-t border-bb-black-light h-[15%]">
        <textarea
          rows="2"
          type="text"
          placeholder="Type a message"
          class="w-full px-3 py-2 border rounded-l-lg border-bb-black focus:outline-none focus:ring-2 focus:ring-bb-red bg-bb-black-light"
        />
        <button class="px-4 py-2 transition duration-300 rounded-r-lg bg-bb-red hover:bg-bb-orange">
          <svg
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
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
      <!-- <div class="h-[10%] flex justify-center flex-col pt-2">
        <div class="flex flex-row p-2 bg-opacity-50 rounded-lg bg-bb-black-light">
          <textarea rows="2" placeholder="Type here..." class="w-[90%] bg-transparent"></textarea>
          <div class="w-[10%] flex justify-center">
            <svg
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
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </div>
        </div>
      </div> -->
    </div>
  </div>
  <navBarVue class="hidden lg:block"></navBarVue>
</template>
