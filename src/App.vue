<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useChatStore } from './stores/chat'

const authStore = useAuthStore()
const chatStore = useChatStore()

const token = localStorage.getItem('access_token')
const user = localStorage.getItem('user')

if (token && user) {
  authStore.reload(token, JSON.parse(user))
} else {
  authStore.logout()
  chatStore.setCurrentAllHistory([])
  chatStore.setCurrentHistory({
    info: {
      game: 0,
      name: '',
      public_id: ''
    },
    chats: []
  })
}
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="fade" mode="out-in">
      <div v-if="route.name" :key="route.name">
        <component :is="Component" />
      </div>
    </Transition>
  </RouterView>
  <!-- <RouterView></RouterView> -->
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
