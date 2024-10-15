<script setup lang="ts">
import headerVue from '@/components/HeaderBar.vue'
import navBarVue from '@/components/NavBar.vue'
import router from '@/router'
import ChatService from '@/services/ChatService'
import { useAuthStore } from '@/stores/auth'
import { useChatStore } from '@/stores/chat'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { onBeforeRouteUpdate, RouterLink, useRoute } from 'vue-router'

import ContextMenu from '@/components/ContextMenu.vue'
import { onClickOutside } from '@vueuse/core'
import type { Rulebook } from '@/type'

const props = defineProps({
  bg_id: {
    type: String,
    required: true
  },
  chat_id: {
    type: String
  }
})

const authStore = useAuthStore()
const chatStore = useChatStore()

const current_chat = storeToRefs(chatStore).current_history
const all_chat = storeToRefs(chatStore).current_all_history

const loadingChat = ref(false)
const message = ref('')
const route = useRoute()
var collection_id = '-1'
if (useRoute().name === 'chatting') {
  const chat_id = route.params.chat_id
  if (typeof chat_id === 'string') {
    collection_id = chat_id
  }
}
const rule = ref<Rulebook>()
ChatService.getRulebooks().then((res) => {
  res.data.forEach((r) => {
    if (r.id === parseInt(props.bg_id)) {
      rule.value = r
    }
  })
})
onBeforeRouteUpdate(async (to) => {
  const bg_id_to = to.params.bg_id
  if (typeof bg_id_to === 'string') {
    ChatService.getRulebooks().then((res) => {
      res.data.forEach((r) => {
        if (r.id === parseInt(bg_id_to)) {
          rule.value = r
        }
      })
    })
  }

  const user_id = authStore.user?.public_id
  const chat_id = to.params.chat_id
  if (user_id && typeof chat_id === 'string') {
    await ChatService.getAllChatHistory(user_id)
      .then(async (response) => {
        chatStore.setCurrentAllHistory(response.data)
        await ChatService.getChatHistory(chat_id)
          .then((res) => {
            chatStore.setCurrentHistory(res.data)
          })
          .catch((err) => {
            console.log(err)
            if (err.response && err.response.status === 404) {
              router.push({ name: 'home' })
            }
          })
      })
      .catch((error) => {
        console.log(error)
        if (error.response && error.response.status === 404) {
          router.push({ name: 'home' })
        }
      })
  }
})

async function sendMessage() {
  if (authStore.user != null) {
    const weekday = new Intl.DateTimeFormat('en-GB', {
      weekday: 'short'
    })
    const date = new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    const now = new Date()
    const formattedDate =
      weekday.format(now) + ', ' + date.format(now) + ' ' + now.toLocaleTimeString('en-GB')
    current_chat.value.chats.push({
      date: formattedDate,
      is_human: true,
      message: message.value,
      is_new: false,
      history_id: ''
    })
    loadingChat.value = true
    await ChatService.sendMessage(
      parseInt(props.bg_id),
      collection_id,
      authStore.user.public_id,
      message.value
    ).then((response) => {
      if (response.data.is_new) {
        router.replace({
          name: 'chatting',
          params: { chat_id: response.data.history_id, bg_id: parseInt(props.bg_id) }
        })
      }

      current_chat.value.chats.push({
        date: response.data.date,
        is_human: false,
        message: response.data.message,
        is_new: false,
        history_id: ''
      })
      console.log(response.data)
      loadingChat.value = false
      message.value = ''
    })
  }
}

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
    ChatService.deleteHistory(targetRow.value).then(async () => {
      if (collection_id === targetRow.value) {
        router.replace({ name: 'home' })
      } else {
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
      }
    })
  }
}

const target = ref(null)
onClickOutside(target, () => {
  isMenuShown.value = false
})
//End of Context Menu
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
    @click="console.log('test')"
    class="text-md lg:text-2xl font-semibold text-bb-white h-[6%] lg:h-[12%] justify-between bg-bb-black fixed px-8 lg:px-12 top-[8vh] lg:top-0 w-full lg:w-[68%] lg:left-[16%] flex flex-row"
  >
    <RouterLink :to="{ name: 'home' }" class="w-[10%] flex justify-center my-auto p-2 lg:hidden">
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
    <p
      class="w-[90%] my-auto font-semibold leading-none text-center lg:text-left h-fit text-bb-white lg:w-auto"
    >
      Chat with BoardBuddy<span v-if="rule !== undefined"> - </span
      ><a
        v-if="rule !== undefined"
        class="underline transition duration-300 underline-offset-4 text-bb-red hover:text-bb-orange active:text-bb-maroon"
        :href="rule?.link"
        target="_blank"
      >
        {{ rule.name }}
      </a>
    </p>
    <!-- <RouterLink
      :to="{ name: 'chat', params: { bg_id: props.bg_id } }"
      class="flex flex-col justify-center h-[60%] group px-2 rounded-lg my-auto transition duration-300 active:scale-95 hover:bg-bb-black-light active:bg-bb-black"
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
          New Chat
        </p>
      </div>
    </RouterLink> -->
  </div>
  <div
    class="min-w-screen min-h-screen bg-bb-black pt-[14vh] lg:pt-[10vh] lg:pb-[15vh] lg:px-[16%] text-bb-white overflow-hidden"
  >
    <div class="lg:py-4 lg:w-[90%] lg:mx-auto">
      <div class="text-sm h-[75%] overflow-x-hidden overflow-y-auto px-8 pt-4 py-20">
        <ul v-if="current_chat != null" class="lg:px-8">
          <div
            v-for="chat in current_chat.chats"
            :key="chat.date"
            class="w-full whitespace-pre-line"
          >
            <li v-if="chat.is_human" class="flex flex-col mb-8">
              <div
                class="p-4 mb-2 rounded-tl-lg rounded-bl-lg rounded-br-lg text-right bg-bb-maroon max-w-[80%] ml-auto"
              >
                <span v-html="chat.message"></span>
              </div>
              <div class="text-xs text-right">{{ chat.date }}</div>
            </li>
            <li v-else class="flex flex-col mb-8 justify-left">
              <div class="flex flex-row mb-2">
                <div class="w-8 h-8 rounded-full bg-slate-600"></div>
                <div class="ml-2 font-semibold leading-loose align-middle">BoardBuddy</div>
              </div>
              <div
                class="p-4 mb-2 rounded-tr-lg rounded-bl-lg rounded-br-lg text-left bg-bb-black-light max-w-[80%]"
              >
                <span v-html="chat.message"></span>
              </div>
              <div class="text-xs">{{ chat.date }}</div>
            </li>
          </div>
          <li v-if="loadingChat" class="flex flex-col mb-8 justify-left animate-pulse">
            <div class="flex flex-row mb-2">
              <div class="w-8 h-8 rounded-full bg-slate-600"></div>
              <div class="ml-2 font-semibold leading-loose align-middle">BoardBuddy</div>
            </div>
            <div
              class="p-4 mb-2 rounded-tr-lg rounded-bl-lg rounded-br-lg bg-bb-black-light lg:max-w-[80%]"
            >
              <div class="w-full h-2 rounded-full"></div>
            </div>
            <div class="w-1/6 h-4 rounded-full bg-bb-black-light"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <form
    @submit.prevent="sendMessage"
    class="flex p-4 h-[12%] lg:h-[15%] w-full lg:w-[68%] left-0 lg:left-[16%] bg-bb-black fixed bottom-0 text-bb-white shadow-[0_-10px_25px_20px_rgba(39,9,44,0.5)]"
  >
    <textarea
      v-model="message"
      required
      rows="2"
      type="text"
      placeholder="Type a message"
      class="w-full px-3 py-2 border rounded-l-lg resize-none border-bb-black focus:outline-none focus:ring-2 focus:ring-bb-red bg-bb-black-light"
    />
    <button
      type="submit"
      class="w-auto h-auto p-4 transition duration-300 border rounded-r-lg border-bb-red ring-bb-red ring-2 bg-bb-red hover:bg-bb-orange hover:ring-bb-orange hover:border-bb-orange active:bg-bb-maroon"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-4 h-4 lg:w-6 lg:h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
        />
      </svg>
    </button>
  </form>
  <div
    class="fixed hidden top-0 right-0 h-full w-[16%] bg-bb-black border-l-2 pr-2 border-bb-black-light text-bb-white lg:flex flex-col"
  >
    <div class="w-full pl-4 h-[12%] text-lg font-medium flex flex-col justify-center">
      All Chats
    </div>
    <div class="flex flex-col">
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
  <navBarVue class="hidden lg:block"></navBarVue>
  <div id="bottom"></div>
</template>
