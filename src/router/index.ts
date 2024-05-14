import AccountView from '@/views/AccountView.vue'
import ChattingView from '@/views/ChattingView.vue'
import ChatView from '@/views/ChatView.vue'
import CollectionInsideView from '@/views/CollectionInsideView.vue'
import CollectionView from '@/views/CollectionView.vue'
import HomeView from '@/views/HomeView.vue'
import SigninView from '@/views/SigninView.vue'
import SignupView from '@/views/SignupView.vue'
import ProfileView from '@/views/ProfileView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '@/views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: false
      },
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
      meta: {
        requiresAuth: false
      },
    },
    {
      path: '/',
      name: 'chatting',
      component: ChattingView,
      meta: {
        requiresAuth: false
      },
    },
    {
      path: '/collection',
      name: 'collection',
      component: CollectionView,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/inside',
      name: 'collectionInside',
      component: CollectionInsideView,
      meta: {
        requiresAuth: false
      },
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      meta: {
        requiresAuth: false
      },
    },
    {
      path: '/signin',
      name: 'signin',
      component: SigninView,
      meta: {
        requiresAuth: false
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
      meta: {
        requiresAuth: false
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        requiresAuth: false
      },
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: {
        requiresAuth: false
      },
    },
  ]
})

const isLoggedIn = () => {
  return localStorage.getItem('access_token') && localStorage.getItem('user')
}

router.beforeEach(async (to, from, next) => {
  console.log(isLoggedIn())
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn()) {
      next({ name: 'signin' })
    } else {
      next()
    }
  } else {
    next()
  }

})
export default router
