<script setup lang="ts">
import navBarVue from '@/components/NavBar.vue'
import headerVue from '@/components/HeaderBar.vue'
import { storeToRefs } from 'pinia'
import { userBGStore } from '@/stores/boardgame'
import { ref } from 'vue'

import ModalPopup from '@/components/ModalPopup.vue'

const isModalShown = ref(false)

const items = storeToRefs(userBGStore()).current_items
</script>
<template>
  <headerVue></headerVue>

  <ModalPopup
    v-model:visible="isModalShown"
    header="New Collection"
    @submit="console.log('submit')"
  >
    <template v-slot:content>
      <label
        for="collectionName"
        class="relative block pt-3 overflow-hidden bg-transparent border-b border-bb-maroon text-bb-white"
      >
        <input
          type="text"
          id="collectionName"
          placeholder="New collection"
          class="w-full h-8 p-0 placeholder-transparent bg-transparent border-none peer focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
        />

        <span
          class="absolute text-xs transition-all -translate-y-1/2 start-0 top-2 text-bb-red peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
        >
          Name
        </span>
      </label>
    </template>
  </ModalPopup>

  <div class="min-w-screen min-h-screen bg-bb-black lg:px-[16%] text-bb-white overflow-hidden">
    <div
      class="text-2xl font-semibold text-bb-white h-[12vh] justify-between bg-bb-black px-12 w-full"
    >
      <div class="flex flex-row justify-between w-full h-full border-b-2 border-bb-black-light">
        <p
          class="w-full my-auto text-2xl font-semibold leading-none text-left h-fit text-bb-white lg:w-auto"
        >
          {{ items?.name }}
        </p>
      </div>
    </div>
    <div class="w-full h-full mx-auto py-8 px-2 lg:w-[90%]">
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <RouterLink
          :to="{ name: 'product', params: { id: item.bg_id } }"
          v-for="item in items?.items"
          :key="item.bg_id"
          class="px-2 pt-2 pb-2 text-left transition duration-300 rounded-lg lg:pb-4 hover:bg-bb-black-light group active:scale-90 hover:scale-105"
        >
          <div class="flex flex-row h-[6rem] md:h-[16rem] lg:h-[9rem] mb-2">
            <div class="w-full">
              <img
                v-if="item.image != null && item.image.length != 0"
                :src="item.image"
                class="object-cover object-right-top w-full h-full transition duration-300 rounded-lg group-hover:opacity-100 opacity-80"
              />
              <div
                v-else
                class="object-cover object-right-top w-full h-full transition duration-300 rounded-lg group-hover:opacity-100 opacity-80 bg-bb-black-light"
              ></div>
            </div>
          </div>
          <p class="text-base font-medium truncate lg:text-lg">{{ item.name }}</p></RouterLink
        >
      </div>
    </div>
  </div>
  <navBarVue></navBarVue>
</template>
