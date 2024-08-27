<script setup lang="ts">
import navBarVue from '@/components/NavBar.vue'
import headerVue from '@/components/HeaderBar.vue'
import ModalPopup from '@/components/ModalPopup.vue'

import { useBGStore } from '@/stores/boardgame'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import type { UserCollection } from '@/type'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import CollectionService from '@/services/CollectionService'

import NProgress from 'nprogress'
import { onBeforeRouteUpdate } from 'vue-router'

const bgStore = useBGStore()
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

onBeforeRouteUpdate(async (to) => {
  const id: string = to.params.id as string
  NProgress.set(0.5)
  await CollectionService.getBoardgame(id)
    .then((response) => {
      bgStore.setCurrentBoardgame(response.data)
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        router.push({ name: 'browse' })
      }
    })

  if (
    localStorage.getItem('access_token') &&
    localStorage.getItem('user') &&
    authStore.user != null
  ) {
    console.log(authStore.user.public_id)
    NProgress.set(0.7)
    await CollectionService.getCollectionToAdd(authStore.user.public_id, id).then((response) => {
      console.log(response.data)
      bgStore.setCurrentCollectionsToAdd(response.data.collections)
    })
  }
  console.log('onBeforeRouteUpdate')
})
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
  <article
    class="flex flex-col bg-bb-black transition lg:pl-[16%] h-full py-[13vh] lg:pb-[13vh] lg:pt-[4vh]"
  >
    <div class="flex flex-col justify-between mx-auto w-[80%]">
      <div
        class="text-2xl font-semibold text-bb-white h-[16vh] md:h-[12vh] justify-between bg-bb-black w-full"
      >
        <div class="flex flex-col items-center justify-between w-full h-full gap-4 md:flex-row">
          <p
            class="w-full my-auto text-2xl font-semibold leading-none text-center md:text-left h-fit text-bb-white lg:w-auto"
          >
            {{ item?.name }} ({{ item?.year_published }})
          </p>
          <button
            @click.prevent.stop="showModal"
            class="block h-[55%] px-5 lg:py-3 py-1 text-xs font-bold text-center uppercase transition duration-300 rounded-lg text-bb-white bg-bb-red hover:bg-bb-orange active:bg-bb-maroon"
          >
            Add to collection
          </button>
        </div>
      </div>
      <div class="block mt-4 md:mt-2 sm:shrink-0">
        <img alt="" :src="item?.image" class="object-cover object-top w-full rounded-lg h-96" />
      </div>

      <div class="border-s border-gray-900/10 sm:border-l-transparent sm:p-6">
        <br />
        <div class="flow-root">
          <dl class="-my-3 text-sm divide-y divide-bb-black-light">
            <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Designer</dt>
              <dd class="text-bb-white sm:col-span-2">{{ item?.boardgame_designer }}</dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Publisher</dt>
              <dd class="text-bb-white sm:col-span-2">{{ item?.boardgame_publisher }}</dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Category</dt>
              <dd class="text-bb-white sm:col-span-2">{{ item?.boardgame_subdomain }}</dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 divide-bb-black-light sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Player Count</dt>
              <dd class="text-bb-white sm:col-span-2">
                {{ item?.min_players }}-{{ item?.max_players }} Players
              </dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 divide-bb-black-light sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Playing Time</dt>
              <dd class="text-bb-white sm:col-span-2">
                {{ item?.min_playtime }}-{{ item?.max_playtime }} Min
              </dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Age</dt>
              <dd class="text-bb-white sm:col-span-2">{{ item?.age }}+</dd>
            </div>

            <!-- <div class="grid grid-cols-1 gap-1 py-3 divide-bb-black-light sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Complexity rating</dt>
              <dd class="text-bb-white sm:col-span-2">Weight: 2.46 / 5</dd>
            </div> -->

            <div class="py-3">
              <dt class="mb-4 font-medium text-bb-white">Description</dt>
              <dd v-html="item?.description" class="text-bb-white sm:col-span-2"></dd>
            </div>
          </dl>
        </div>
      </div>

      <div class="text-bb-white">
        <p class="mb-4 font-medium">More Like This</p>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <RouterLink
            v-for="rec in item?.recommendation"
            :key="rec._source.id"
            :to="{ name: 'product', params: { id: rec._source.id } }"
            class="px-2 pt-2 pb-4 text-left transition duration-300 rounded-lg hover:bg-bb-black-light group active:scale-95 hover:scale-105"
          >
            <div class="flex flex-row h-[6rem] md:h-[16rem] lg:h-[10rem] mb-2">
              <div class="w-full">
                <img
                  :src="rec._source.image"
                  class="object-cover object-right-top w-full h-full transition duration-300 rounded-lg group-hover:opacity-100 opacity-80"
                />
              </div>
            </div>
            <p class="text-lg font-medium truncate">{{ rec._source.name }}</p>
          </RouterLink>
        </div>
      </div>
    </div>
  </article>

  <navBarVue></navBarVue>
</template>
