<script setup lang="ts">
import navBarVue from '@/components/NavBar.vue'
import headerVue from '@/components/HeaderBar.vue'
import ModalPopup from '@/components/ModalPopup.vue'

import { userBGStore } from '@/stores/boardgame'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import type { UserCollection } from '@/type'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import CollectionService from '@/services/CollectionService'

import NProgress from 'nprogress'

const bgStore = userBGStore()
const authStore = useAuthStore()

const item = storeToRefs(bgStore).current_boardgame
const isModalShown = ref(false)
const collectionList = storeToRefs(bgStore).current_collections_to_add
const colToSave = ref<UserCollection>()

function showModal() {
  if (authStore.user != null && authStore.isLoggedIn) {
    isModalShown.value = true
    colToSave.value = undefined
  } else {
    router.push({ name: 'signin' })
  }
}

async function addItem() {
  if (authStore.user != null && authStore.isLoggedIn) {
    NProgress.start()
    if (
      item.value != undefined &&
      colToSave.value != undefined &&
      item.value != null &&
      colToSave.value != null &&
      item.value.id != null &&
      colToSave.value.public_id != null
    ) {
      await CollectionService.addItem(item.value.id, colToSave.value.public_id).then(() => {
        // console.log('add item')
        isModalShown.value = false
        colToSave.value = undefined
        NProgress.done()
      })
      router.go(0)
    }
  }
}
</script>
<template class="bg-bb-black">
  <headerVue></headerVue>
  <ModalPopup v-model:visible="isModalShown" header="Add To Your Collection" @submit="addItem">
    <template v-slot:content>
      <div class="h-[320px] overflow-auto">
        <div
          v-for="col in collectionList"
          :key="col.public_id"
          class="flex items-center gap-2 p-2 text-lg"
        >
          <label :for="col.public_id + col.name" class="flex items-center gap-4 cursor-pointer">
            <input
              :disabled="col.have"
              class="box-content h-2 w-2 cursor-pointer appearance-none rounded-full border-[5px] border-bb-black bg-bb-black bg-clip-padding outline-none ring-2 checked:ring-bb-red checked:bg-bb-red transition duration-75"
              :class="col.have ? 'ring-bb-maroon' : 'ring-bb-white'"
              type="radio"
              :id="col.public_id + col.name"
              :value="col"
              v-model="colToSave"
            />
            <div
              class="flex flex-col justify-center text-left"
              :class="col.have ? 'text-bb-red' : 'text-bb-white'"
            >
              <span>{{ col.name }}</span>
              <span class="text-xs font-normal" v-if="col.have">Already in this collection</span>
            </div>
          </label>
        </div>
      </div>
    </template>
  </ModalPopup>
  <article class="flex bg-bb-black transition lg:pl-[16%] h-full py-[13vh]">
    <div class="flex flex-col justify-between mx-auto w-[80%]">
      <div class="hidden sm:block sm:shrink-0">
        <img alt="" :src="item?.image" class="object-cover w-full rounded-lg h-96" />
      </div>

      <div class="border-s border-gray-900/10 sm:border-l-transparent sm:p-6">
        <a href="#">
          <h3 class="font-bold uppercase text-bb-white">
            {{ item?.name }} ({{ item?.year_published }})
          </h3>
        </a>

        <!-- <p class="mt-2 line-clamp-3 text-sm/relaxed text-bb-white">
          {{ item?.description }}
        </p> -->

        <br />
        <div class="flow-root">
          <dl class="-my-3 text-sm divide-y divide-bb-black-light">
            <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Designer</dt>
              <dd class="text-bb-white sm:col-span-2">{{ item?.boardgame_designer }}</dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 divide-bb-black-light sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Playing Time</dt>
              <dd class="text-bb-white sm:col-span-2">
                {{ item?.min_playtime }}-{{ item?.max_playtime }} Min
              </dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Age</dt>
              <dd class="text-bb-white sm:col-span-2">{{ item?.age }}+</dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 divide-bb-black-light sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Complexity rating</dt>
              <dd class="text-bb-white sm:col-span-2">Weight: 2.46 / 5</dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Description</dt>
              <dd v-html="item?.description" class="text-bb-white sm:col-span-2"></dd>
            </div>
          </dl>
        </div>
      </div>

      <div class="mt-4 sm:flex sm:items-end sm:justify-end">
        <button
          @click.prevent.stop="showModal"
          class="block px-5 py-3 text-xs font-bold text-center uppercase transition duration-300 rounded-lg text-bb-white bg-bb-red hover:bg-bb-orange"
        >
          Add to collection
        </button>
      </div>
    </div>
  </article>

  <navBarVue></navBarVue>
</template>
