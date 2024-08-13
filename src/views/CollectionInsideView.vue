<script setup lang="ts">
import navBarVue from '@/components/NavBar.vue'
import headerVue from '@/components/HeaderBar.vue'
import { storeToRefs } from 'pinia'
import { userBGStore } from '@/stores/boardgame'
import { ref } from 'vue'

import ConfirmModalDialog from '@/components/ConfirmModalDialog.vue'

import ContextMenu from '@/components/ContextMenu.vue'
import { onClickOutside } from '@vueuse/core'
import CollectionService from '@/services/CollectionService'
import router from '@/router'

import Menu from 'primevue/menu'
import Button from 'primevue/button'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import { RouterLink } from 'vue-router'
import type { Boardgame } from '@/type'

const items = storeToRefs(userBGStore()).current_items

//Context Menu
const isMenuShown = ref(false)
const menuX = ref(0)
const menuY = ref(0)
const targetRow = ref('')
const contextMenuActions = ref([
  // { label: 'Rename', action: 'rename' },
  { label: 'Delete', action: 'delete', icon: '/src/assets/trash.svg' }
])
const showContextMenu = (event: any, user: any) => {
  event.preventDefault()
  isMenuShown.value = true
  targetRow.value = user
  menuX.value = event.pageX
  menuY.value = event.pageY
  console.log(targetRow.value)
}

function handleActionClick(action: any) {
  if (action == 'delete') {
    console.log('delete ' + targetRow.value)
    CollectionService.deleteItem(targetRow.value).then(() => {
      router.go(0)
    })
  }
}

const target = ref(null)
onClickOutside(target, () => {
  isMenuShown.value = false
})
//End of Context Menu

const menu = ref()
const menuItems = ref([
  {
    label: 'Delete collection',
    icon: 'pi pi-trash',
    command: () => {
      confirmDelete()
    }
  }
])

const toggle = (event: any) => {
  menu.value.toggle(event)
}

const confirm = useConfirm()
const confirmDelete = () => {
  confirm.require({
    group: 'confirmDelete',
    message: 'Do you want to delete this collection?',
    header: 'Delete ' + items.value?.name,
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancel',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger'
    },
    accept: () => {
      if (items.value != null) {
        CollectionService.deleteCollection(items.value.public_id).then(() => {
          router.push({ name: 'collection' })
        })
      }
    },
    reject: () => {},
    position: 'topleft'
  })
}

const randomGame = () => {
  confirm.require({
    group: 'randomGame',
    message: '',
    header: 'Random Game Picker',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancel',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Confirm',
      severity: 'danger'
    },
    accept: () => {
      if (items.value != null) {
        if (toggleRandomAge.value == false) {
          randomAge.value = 0
        }
        if (toggleRandomPlaytime.value == false) {
          randomMinPlaytime.value = 0
          randomMaxPlaytime.value = 0
        }
        if (toggleRandomPlayers.value == false) {
          randomMinPlayers.value = 0
          randomMaxPlayers.value = 0
        }

        CollectionService.randomPick(
          items.value?.public_id,
          randomAge.value,
          randomMinPlaytime.value,
          randomMaxPlaytime.value,
          randomMinPlayers.value,
          randomMaxPlayers.value
        ).then((response) => {
          console.log(response.data)
          if (response.data.length != 0) {
            randomGamePicked.value = response.data[0]
          } else {
            randomGamePicked.value = {
              isEmpty: true
            }
          }
          gamePicked()
        })
      }
    },
    reject: () => {},
    position: 'topleft'
  })
}

const gamePicked = () => {
  confirm.require({
    group: 'gameShow',
    message: '',
    header: 'Game To Play Today!',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancel',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Confirm',
      severity: 'danger'
    },
    accept: () => {},
    reject: () => {},
    position: 'topleft'
  })
}

const toggleRandomAge = ref(false)
const toggleRandomPlaytime = ref(false)
const toggleRandomPlayers = ref(false)
const randomAge = ref(0)
const randomMinPlaytime = ref(0)
const randomMaxPlaytime = ref(0)
const randomMinPlayers = ref(0)
const randomMaxPlayers = ref(0)
const randomGamePicked = ref()
</script>
<template>
  <headerVue></headerVue>
  <!-- delete confirmation -->
  <ConfirmDialog group="confirmDelete">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <ConfirmModalDialog
        @accept-callback="acceptCallback"
        @reject-callback="rejectCallback"
        :header="message.header"
      >
        <template v-slot:content>
          <p>{{ message.message }}</p>
        </template>
      </ConfirmModalDialog>
    </template>
  </ConfirmDialog>
  <!-- random pick show -->
  <ConfirmDialog group="gameShow">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <ConfirmModalDialog
        @accept-callback="acceptCallback"
        @reject-callback="rejectCallback"
        :header="message.header"
      >
        <template v-slot:content>
          <RouterLink
            v-if="!randomGamePicked.isEmpty"
            :to="{ name: 'product', params: { id: randomGamePicked?.bg_id } }"
            :key="randomGamePicked?.bg_id"
            class="text-left transition duration-300 rounded-lg hover:bg-bb-black-light group"
          >
            <div class="flex flex-row h-[6rem] md:h-[16rem] lg:h-[10rem] mb-2">
              <div class="w-full">
                <img
                  :src="randomGamePicked?.image"
                  class="object-cover object-center w-full h-full transition duration-300 rounded-lg group-hover:opacity-100 opacity-80"
                />
              </div>
            </div>
            <p class="text-lg font-medium truncate">{{ randomGamePicked?.name }}</p>
          </RouterLink>
          <div v-else>No board games in this collection match your filters.</div>
        </template>
      </ConfirmModalDialog>
    </template>
  </ConfirmDialog>
  <!-- random dialog -->
  <ConfirmDialog group="randomGame">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <ConfirmModalDialog
        @accept-callback="acceptCallback"
        @reject-callback="rejectCallback"
        :header="message.header"
      >
        <template v-slot:content>
          <div class="flex flex-col gap-2 p-2 text-base">
            <span
              >You can use the filters below to limit what can be randomized. Pressing "Confirm"
              without any filters will randomly pick a board game from all of this collection.</span
            >
            <span class="text-base font-semibold">Filters</span>
            <div class="flex flex-row" :class="toggleRandomAge ? 'opacity-100' : 'opacity-50'">
              <label :for="'randomAge'" class="flex items-center w-1/2 gap-4 cursor-pointer">
                <input
                  class="box-content h-2 w-2 cursor-pointer ring-bb-white appearance-none rounded-full border-[5px] border-bb-black bg-bb-black bg-clip-padding outline-none ring-2 checked:ring-bb-red checked:bg-bb-red transition duration-75"
                  type="checkbox"
                  :id="'randomAge'"
                  v-model="toggleRandomAge"
                />
                <div class="flex flex-col justify-center text-left text-bb-white">
                  <span>Minimum Age</span>
                </div>
              </label>
              <div class="flex flex-col w-1/2">
                <input
                  v-model="randomAge"
                  :disabled="!toggleRandomAge"
                  min="0"
                  class="w-full px-2 border-2 rounded-lg bg-bb-black border-bb-white"
                  type="number"
                />
              </div>
            </div>

            <div class="flex flex-row" :class="toggleRandomPlaytime ? 'opacity-100' : 'opacity-50'">
              <label :for="'randomPlaytime'" class="flex items-center w-1/2 gap-4 cursor-pointer">
                <input
                  class="box-content h-2 w-2 cursor-pointer ring-bb-white appearance-none rounded-full border-[5px] border-bb-black bg-bb-black bg-clip-padding outline-none ring-2 checked:ring-bb-red checked:bg-bb-red transition duration-75"
                  type="checkbox"
                  :id="'randomPlaytime'"
                  v-model="toggleRandomPlaytime"
                />
                <div class="flex flex-col justify-center text-left text-bb-white">
                  <span>Play Time</span>
                </div>
              </label>
              <div class="flex flex-row w-1/2 gap-1">
                <input
                  v-model="randomMinPlaytime"
                  :disabled="!toggleRandomPlaytime"
                  min="0"
                  class="w-full px-2 border-2 rounded-lg bg-bb-black border-bb-white"
                  type="number"
                />
                <span>to</span>
                <input
                  v-model="randomMaxPlaytime"
                  :disabled="!toggleRandomPlaytime"
                  min="0"
                  class="w-full px-2 border-2 rounded-lg bg-bb-black border-bb-white"
                  type="number"
                />
              </div>
            </div>

            <div class="flex flex-row" :class="toggleRandomPlayers ? 'opacity-100' : 'opacity-50'">
              <label :for="'randomPlayers'" class="flex items-center w-1/2 gap-4 cursor-pointer">
                <input
                  class="box-content h-2 w-2 cursor-pointer ring-bb-white appearance-none rounded-full border-[5px] border-bb-black bg-bb-black bg-clip-padding outline-none ring-2 checked:ring-bb-red checked:bg-bb-red transition duration-75"
                  type="checkbox"
                  :id="'randomPlayers'"
                  v-model="toggleRandomPlayers"
                />
                <div class="flex flex-col justify-center text-left text-bb-white">
                  <span>Player Count</span>
                </div>
              </label>
              <div class="flex flex-row w-1/2 gap-1">
                <input
                  v-model="randomMinPlayers"
                  :disabled="!toggleRandomPlayers"
                  min="0"
                  class="w-full px-2 border-2 rounded-lg bg-bb-black border-bb-white"
                  type="number"
                />
                <span>to</span>
                <input
                  v-model="randomMaxPlayers"
                  :disabled="!toggleRandomPlayers"
                  min="0"
                  class="w-full px-2 border-2 rounded-lg bg-bb-black border-bb-white"
                  type="number"
                />
              </div>
            </div>
          </div>
        </template>
      </ConfirmModalDialog>
    </template>
  </ConfirmDialog>

  <ContextMenu
    ref="target"
    :isMenuShown="isMenuShown"
    :actions="contextMenuActions"
    @action-clicked="handleActionClick"
    :x="menuX"
    :y="menuY"
  />

  <div
    class="min-w-screen min-h-screen bg-bb-black lg:px-[16%] text-bb-white overflow-hidden pt-8 lg:pt-4"
  >
    <div
      class="text-2xl font-semibold text-bb-white h-[12vh] justify-between bg-bb-black px-12 w-full"
    >
      <div class="flex flex-row justify-between w-full h-full border-b-2 border-bb-black-light">
        <p
          class="w-[95%] my-auto text-2xl font-semibold leading-none text-left h-fit text-bb-white lg:w-auto"
        >
          {{ items?.name }}
        </p>
        <div class="w-[5%] flex items-center">
          <Button
            class="w-10 h-10 mx-auto transition duration-300 rounded-full group hover:bg-bb-black-light bg-bb-black text-bb-white"
            type="button"
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_menu"
          >
            <span
              class="pi pi-ellipsis-v text-[1.5rem] text-bb-white/80 group-hover:text-bb-white/100"
            ></span>
          </Button>
        </div>
        <Menu
          class="shadow-[0_0_4px_4px_rgba(0,0,0,0.15)] w-fit absolute right-12 font-normal text-base py-2 rounded-lg border-[#6b4a78] bg-bb-black-light text-bb-white min-w-[200px]"
          ref="menu"
          id="overlay_menu"
          :model="menuItems"
          :popup="true"
        >
          <template #item="{ item }">
            <a class="hover:bg-[#5f426c] group py-2 px-4 cursor-pointer flex items-center gap-4">
              <span :class="item.icon" class="group-hover:text-bb-white/100 text-bb-white/80" />
              <span>{{ item.label }}</span>
            </a>
          </template>
        </Menu>
      </div>
    </div>

    <div class="w-full h-full mx-auto py-8 md:pb-16 px-2 lg:w-[90%]">
      <div class="flex justify-center w-full mb-4" v-if="items?.items.length != 0">
        <Button
          @click="randomGame"
          class="p-4 text-sm font-medium text-center transition duration-300 ease-in-out rounded-lg h-fit bg-bb-red end-0 hover:bg-bb-orange active:bg-bb-maroon"
        >
          What game should I play today?
        </Button>
      </div>
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <RouterLink
          @click.prevent.stop.right="showContextMenu($event, item.public_id)"
          :to="{ name: 'product', params: { id: item.bg_id } }"
          v-for="item in items?.items"
          :key="item.public_id"
          class="p-2 text-left transition duration-300 rounded-lg hover:bg-bb-black-light group active:scale-95 lg:hover:scale-105"
        >
          <div class="flex flex-row h-[6rem] md:h-[16rem] lg:h-[10rem] mb-2">
            <div class="w-full">
              <img
                v-if="item.image != null && item.image.length != 0"
                :src="item.image"
                class="object-cover object-center w-full h-full transition duration-300 rounded-lg group-hover:opacity-100 opacity-80"
              />
              <div
                v-else
                class="object-cover w-full h-full transition duration-300 rounded-lg object-center-top group-hover:opacity-100 opacity-80 bg-bb-black-light"
              ></div>
            </div>
          </div>
          <div class="flex flex-row h-16">
            <div class="flex flex-col w-[84%]">
              <div class="text-base font-medium line-clamp-2 lg:text-lg">{{ item.name }}</div>
            </div>
            <div class="w-[16%] flex justify-center items-start">
              <button
                @click.prevent.stop="showContextMenu($event, item.public_id)"
                class="z-10 flex items-center w-8 h-8 transition duration-300 rounded-full hover:bg-bb-black-lighter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="mx-auto size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
  <div
    class="text-bb-white fixed top-0 right-0 h-full w-[16%] p-4 overflow-y-auto bg-bb-black border-l-2 pr-2 border-bb-black-light hidden lg:flex flex-col"
  >
    <p class="mb-4 text-lg font-medium">Recommendations</p>
    <div class="grid grid-cols-1 gap-4" v-if="items?.recommendation.length != 0">
      <RouterLink
        v-for="rec in items?.recommendation"
        :key="rec.bg_id"
        :to="{ name: 'product', params: { id: rec.bg_id } }"
        class="px-2 pt-2 pb-4 text-left transition duration-300 rounded-lg hover:bg-bb-black-light group active:scale-95 hover:scale-105"
      >
        <div class="flex flex-row h-[4rem] md:h-[14rem] lg:h-[8rem] mb-2">
          <div class="w-full">
            <img
              :src="rec.image"
              class="object-cover object-right-top w-full h-full transition duration-300 rounded-lg group-hover:opacity-100 opacity-80"
            />
          </div>
        </div>
        <p class="text-lg font-medium truncate">{{ rec.name }}</p>
      </RouterLink>
    </div>
    <div class="flex flex-col justify-center px-2" v-else>
      <span
        >You can get some recommendations for this collection after adding some board games to
        this!</span
      >
      <RouterLink
        :to="{ name: 'browse' }"
        class="px-4 py-2 mt-8 text-sm font-medium text-center transition duration-300 ease-in-out rounded-lg h-fit bg-bb-red end-0 hover:bg-bb-orange active:bg-bb-maroon"
      >
        Browse
      </RouterLink>
    </div>
  </div>
  <navBarVue></navBarVue>
</template>
