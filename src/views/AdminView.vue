<script setup lang="ts">
import navBarVue from '@/components/NavBar.vue'
</script>
<template>
  <article class="flex bg-bb-black transition lg:pl-[16%] h-full pt-[8vh] pb-[12vh]">
    <div class="flex flex-col justify-between mx-auto w-[80%]">
      <div class="flex items-center justify-center w-full">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer text-bb-white border-bb-white bg-bb-black-light hover:bg-bb-maroon"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="w-8 h-8 mb-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-sm text-bb-white">
              <span class="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p class="text-xs text-bb-white">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" />
        </label>
      </div>

      <div class="p-4 border-s border-gray-900/10 sm:border-l-transparent sm:p-6">
        <a href="#">
          <label
            for="Game name"
            class="relative block pt-3 overflow-hidden bg-transparent border-b border-bb-maroon text-bb-white"
          >
            <input
              type="gamename"
              id="Gamename"
              placeholder="Gamename"
              class="w-full h-8 p-0 placeholder-transparent bg-transparent border-none peer focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />

            <span
              class="absolute text-xs transition-all -translate-y-1/2 start-0 top-2 text-bb-red peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
            >
              Game name
            </span>
          </label>
        </a>

        <br />
        <div class="flow-root">
          <dl class="-my-3 text-sm divide-y divide-bb-black-light">
            <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Designer</dt>
              <label
                for="Designer"
                class="relative block pt-3 overflow-hidden bg-transparent border-b border-bb-maroon text-bb-white"
              >
                <input
                  type="designer"
                  id="Designer"
                  placeholder="Designer"
                  class="w-full h-8 p-0 placeholder-transparent bg-transparent border-none peer focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                />

                <span
                  class="absolute text-xs transition-all -translate-y-1/2 start-0 top-2 text-bb-red peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                >
                  Designer name
                </span>
              </label>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 divide-bb-black-light sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Playing Time</dt>
              <label
                for="Playingtime"
                class="relative block pt-3 overflow-hidden bg-transparent border-b border-bb-maroon text-bb-white"
              >
                <input
                  type="playingtime"
                  id="Playingtime"
                  placeholder="Playingtime"
                  class="w-full h-8 p-0 placeholder-transparent bg-transparent border-none peer focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                />

                <span
                  class="absolute text-xs transition-all -translate-y-1/2 start-0 top-2 text-bb-red peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                >
                  Playing time
                </span>
              </label>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Age</dt>
              <label
                for="Age"
                class="relative block pt-3 overflow-hidden bg-transparent border-b border-bb-maroon text-bb-white"
              >
                <input
                  type="age"
                  id="Age"
                  placeholder="Age"
                  class="w-full h-8 p-0 placeholder-transparent bg-transparent border-none peer focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                />

                <span
                  class="absolute text-xs transition-all -translate-y-1/2 start-0 top-2 text-bb-red peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                >
                  Age to play
                </span>
              </label>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 divide-bb-black-light sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Complexity rating</dt>
              <label
                for="Complexity"
                class="relative block pt-3 overflow-hidden bg-transparent border-b border-bb-maroon text-bb-white"
              >
                <input
                  type="complexity"
                  id="Complexity"
                  placeholder="Complexity"
                  class="w-full h-8 p-0 placeholder-transparent bg-transparent border-none peer focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                />

                <span
                  class="absolute text-xs transition-all -translate-y-1/2 start-0 top-2 text-bb-red peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                >
                  Complexity
                </span>
              </label>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Description</dt>
              <label
                for="Description"
                class="relative block pt-3 overflow-hidden bg-transparent border-b border-bb-maroon text-bb-white"
              >
                <textarea
                  rows="6"
                  type="description"
                  id="Description"
                  placeholder="Description"
                  class="w-full h-8 p-0 placeholder-transparent bg-transparent border-none peer focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                />

                <span
                  class="absolute text-xs transition-all -translate-y-1/2 start-0 top-2 text-bb-red peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                >
                  Description
                </span>
              </label>
            </div>
          </dl>
        </div>
      </div>

      <div class="sm:flex sm:items-end sm:justify-end">
        <a
          href="#"
          class="block px-5 py-3 text-xs font-bold text-center uppercase transition duration-300 rounded-lg text-bb-white bg-bb-red hover:bg-bb-orange"
        >
          Add to Game list.
        </a>
      </div>
    </div>
  </article>

  <navBarVue></navBarVue>
</template>
