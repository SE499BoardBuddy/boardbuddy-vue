import AccountView from '@/views/AccountView.vue'
import ChattingView from '@/views/ChattingView.vue'
import ChatView from '@/views/ChatView.vue'
import CollectionInsideView from '@/views/CollectionInsideView.vue'
import CollectionView from '@/views/CollectionView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import ProfileView from '@/views/ProfileView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
    },
    {
      path: '/',
      name: 'chatting',
      component: ChattingView
    },
    {
      path: '/collection',
      name: 'collection',
      component: CollectionView
    },
    {
      path: '/inside',
      name: 'collectionInside',
      component: CollectionInsideView
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    }
  ]
})

export default router
