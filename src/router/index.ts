import AccountView from '@/views/AccountView.vue'
import ChattingView from '@/views/ChattingView.vue'
import ChatView from '@/views/ChatView.vue'
import CollectionView from '@/views/CollectionView.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
    },
    {
      path: '/chatting',
      name: 'chatting',
      component: ChattingView
    },
    {
      path: '/collection',
      name: 'collection',
      component: CollectionView
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView
    }
  ]
})

export default router
