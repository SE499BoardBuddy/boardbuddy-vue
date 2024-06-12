<script setup lang="ts">
import navBarVue from '@/components/NavBar.vue'
import headerVue from '@/components/HeaderBar.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { userBGStore } from '@/stores/boardgame'
import CollectionService from '@/services/CollectionService'
import router from '@/router'

import { onClickOutside } from '@vueuse/core'
import ContextMenu from '@/components/ContextMenu.vue'

import ModalPopup from '@/components/ModalPopup.vue'

const isModalShown = ref(false)
const collectionName = ref('')

const authStore = useAuthStore()
const bgStore = userBGStore()
const user = storeToRefs(authStore).user
const collections = storeToRefs(bgStore).current_collections
function createCollection() {
  if (user.value != null) {
    if (collectionName.value.length == 0) {
      collectionName.value = 'new collection'
    }
    CollectionService.createCollections(collectionName.value, user.value.public_id).then(
      async () => {
        if (user.value != null) {
          await CollectionService.getCollectionsByUserID(user.value.public_id).then((response) => {
            bgStore.setCurrentCollections(response.data)
          })
        }
      }
    )
  }
  isModalShown.value = false
  collectionName.value = ''
}
function showModal() {
  isModalShown.value = true
  collectionName.value = ''
}

const isMenuShown = ref(false)
const menuX = ref(0)
const menuY = ref(0)
const targetRow = ref('')
const contextMenuActions = ref([
  // { label: 'Rename', action: 'rename' },
  { label: 'Delete', action: 'delete' }
])
const showContextMenu = (event: any, user: string) => {
  event.preventDefault()
  isMenuShown.value = true
  targetRow.value = user
  menuX.value = event.pageX
  menuY.value = event.pageY
}

const closeContextMenu = () => {
  isMenuShown.value = false
}

async function handleActionClick(action: any) {
  if (action == 'rename') {
    console.log('rename ' + targetRow.value)
  } else {
    console.log('delete ' + targetRow.value)
    CollectionService.deleteCollection(targetRow.value).then(() => {
      router.go(0)
    })
  }
}

const target = ref(null)
onClickOutside(target, () => {
  closeContextMenu()
})
</script>
<template>
  <ContextMenu
    ref="target"
    v-if="isMenuShown"
    :actions="contextMenuActions"
    @action-clicked="handleActionClick"
    :x="menuX"
    :y="menuY"
  />
  <ModalPopup v-model:visible="isModalShown" header="New Collection" @submit="createCollection">
    <template v-slot:content>
      <label
        for="collectionName"
        class="relative block pt-3 overflow-hidden bg-transparent border-b border-bb-maroon text-bb-white"
      >
        <input
          v-model="collectionName"
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
  <headerVue></headerVue>
  <div
    class="min-w-screen min-h-screen bg-bb-black lg:px-[16%] px-2 text-bb-white overflow-hidden pt-8 lg:pt-0"
  >
    <div
      class="text-2xl font-semibold text-bb-white h-[12vh] justify-between bg-bb-black lg:px-12 w-full"
    >
      <div class="flex flex-row justify-between w-full h-full border-b-2 border-bb-black-light">
        <p
          class="my-auto text-2xl w-[80%] font-semibold leading-none text-left h-fit text-bb-white lg:w-auto"
        >
          {{ user?.username }}'s Collections
        </p>
        <button
          @click="showModal"
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

    <div class="w-full h-full mx-auto py-8 lg:w-[90%]" v-if="collections != null">
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <RouterLink
          @click.prevent.stop.right="showContextMenu($event, col.public_id)"
          :to="{ name: 'collectionInside', params: { collection_id: col.public_id } }"
          v-for="col in collections"
          :key="col.public_id"
          class="px-2 pt-2 pb-2 text-left transition duration-300 rounded-lg lg:pb-4 hover:bg-bb-black-light group active:scale-90 hover:scale-105"
        >
          <div class="flex flex-row h-[6rem] md:h-[16rem] lg:h-[9rem] mb-2">
            <div class="w-[60%]">
              <img
                v-if="col.thumbnail.length >= 1"
                :src="col.thumbnail[0]"
                class="object-cover object-right-top w-full h-full transition duration-300 border-r-2 rounded-tl-lg rounded-bl-lg group-hover:opacity-100 opacity-80 border-bb-black group-hover:border-bb-black-light"
              />
              <div
                v-else
                class="object-cover object-right-top w-full h-full transition duration-300 border-r-2 rounded-tl-lg rounded-bl-lg group-hover:border-bb-black-light bg-bb-black-light group-hover:opacity-100 opacity-80 border-bb-black"
              ></div>
            </div>
            <div class="w-[40%]">
              <div class="h-[50%]">
                <img
                  v-if="col.thumbnail.length >= 2"
                  :src="col.thumbnail[1]"
                  class="object-cover object-right-top w-full h-full transition duration-300 border-b-2 border-l-2 rounded-tr-lg group-hover:border-bb-black-light border-bb-black group-hover:opacity-100 opacity-80"
                />
                <div
                  v-else
                  class="object-cover object-right-top w-full h-full transition duration-300 border-b-2 border-l-2 rounded-tr-lg group-hover:border-bb-black-light bg-bb-black-light border-bb-black group-hover:opacity-100 opacity-80"
                ></div>
              </div>
              <div class="h-[50%]">
                <img
                  v-if="col.thumbnail.length >= 3"
                  :src="col.thumbnail[2]"
                  class="object-cover object-right-top w-full h-full transition duration-300 border-t-2 border-l-2 rounded-br-lg group-hover:border-bb-black-light border-bb-black group-hover:opacity-100 opacity-80"
                />
                <div
                  v-else
                  class="object-cover object-right-top w-full h-full transition duration-300 border-t-2 border-l-2 rounded-br-lg group-hover:border-bb-black-light bg-bb-black-light border-bb-black group-hover:opacity-100 opacity-80"
                ></div>
              </div>
            </div>
          </div>
          <p class="text-base font-medium truncate lg:text-lg">{{ col.name }}</p>
          <p class="text-xs">{{ col.game_count }} Games</p>
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
