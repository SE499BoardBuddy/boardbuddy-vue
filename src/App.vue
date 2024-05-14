<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const token = localStorage.getItem('access_token')
const user = localStorage.getItem('user')

if (token && user) {
  authStore.reload(token, JSON.parse(user))
} else {
  authStore.logout()
}
</script>

<template>
  <RouterView class="bg-bb-black" />
</template>

<style scoped></style>
