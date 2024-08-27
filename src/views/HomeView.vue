<script setup lang="ts">
import headerVue from '@/components/HeaderBar.vue'
import navBarVue from '@/components/NavBar.vue'
import router from '@/router'
import ChatService from '@/services/ChatService'
import { useAuthStore } from '@/stores/auth'
import { useChatStore } from '@/stores/chat'
import { onClickOutside } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import ContextMenu from '@/components/ContextMenu.vue'

const authStore = useAuthStore()
const chatStore = useChatStore()
const loginState = storeToRefs(authStore).isLoggedIn
const all_chat = storeToRefs(chatStore).current_all_history
const rulebooks = storeToRefs(chatStore).rulebooks

//Context Menu
const isMenuShown = ref(false)
const menuX = ref(0)
const menuY = ref(0)
const targetRow = ref('')
const contextMenuActions = ref([
  { label: 'Delete', action: 'delete', icon: '/src/assets/trash.svg' }
])
const showContextMenu = (event: any, user: string) => {
  event.preventDefault()
  isMenuShown.value = true
  targetRow.value = user
  menuX.value = event.pageX
  menuY.value = event.pageY
  console.log(contextMenuActions.value)
}

function handleActionClick(action: any) {
  if (action == 'delete') {
    console.log('delete ' + targetRow.value)
    ChatService.deleteHistory(targetRow.value).then(() => {
      router.go(0)
    })
  }
}

const target = ref(null)
onClickOutside(target, () => {
  isMenuShown.value = false
})
//End of Context Menu

onBeforeRouteUpdate(async () => {
  const user_id = authStore.user?.public_id
  if (user_id) {
    await ChatService.getAllChatHistory(user_id)
      .then(async (response) => {
        chatStore.setCurrentAllHistory(response.data)
      })
      .catch((error) => {
        console.log(error)
        if (error.response && error.response.status === 404) {
          router.push({ name: 'home' })
        }
      })
  }
})
</script>
<template>
  <ContextMenu
    ref="target"
    :isMenuShown="isMenuShown"
    :actions="contextMenuActions"
    @action-clicked="handleActionClick"
    :x="menuX - 201"
    :y="menuY"
  />
  <headerVue></headerVue>
  <div
    class="lg:z-1-header font-semibold text-bb-white h-[10%] lg:h-[12%] justify-between bg-bb-black absolute lg:fixed px-2 lg:px-12 top-[8vh] lg:top-0 w-full lg:w-[68%] left-0 lg:left-[16%] flex flex-row"
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
        :to="{ name: 'chat', params: { bg_id: game.id } }"
        class="p-2 truncate transition duration-300 rounded-lg lg:h-64 group bg-bb-black hover:bg-bb-black-light hover:scale-105"
        v-for="game in rulebooks"
        :key="game"
      >
        <div class="w-full mb-2 h-4/5">
          <img
            :src="game.image"
            class="object-cover object-right-top w-full h-full transition duration-300 border-r-2 rounded-lg group-hover:opacity-100 opacity-80 border-bb-black"
          />
        </div>
        <span class="w-full text-xl font-semibold">{{ game.name }}</span>
      </RouterLink>
    </div>
  </div>
  <div
    class="fixed top-0 right-0 h-full w-[16%] bg-bb-black border-l-2 pr-2 border-bb-black-light text-bb-white flex flex-col"
  >
    <div class="w-full pl-4 h-[12%] text-lg font-medium flex flex-col justify-center">
      All Chats
    </div>
    <div v-if="loginState" class="flex flex-col">
      <RouterLink
        :to="{ name: 'chatting', params: { chat_id: history.public_id, bg_id: history.game } }"
        v-for="history in all_chat"
        :key="history.public_id"
        href=""
        class="flex flex-col justify-center h-12 px-4 text-sm transition duration-300 border-l-4 rounded-tr-lg rounded-br-lg active:scale-95 group hover:bg-bb-black-light hover:border-bb-red border-bb-black"
      >
        <div class="flex flex-row justify-between">
          <div class="truncate">
            {{ history.name }}
          </div>
          <button
            @click.prevent.stop="showContextMenu($event, history.public_id)"
            class="p-1 rounded hover:bg-bb-black"
          >
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
          </button>
        </div>
      </RouterLink>
    </div>
  </div>
  <navBarVue class=""></navBarVue>
</template>
