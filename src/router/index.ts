import AccountView from '@/views/AccountView.vue'
import ChattingView from '@/views/ChattingView.vue'
import ChatView from '@/views/ChatView.vue'
import CollectionInsideView from '@/views/CollectionInsideView.vue'
import CollectionView from '@/views/CollectionView.vue'
import BrowseView from '@/views/BrowseView.vue'
import SigninView from '@/views/SigninView.vue'
import SignupView from '@/views/SignupView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ProductView from '@/views/ProductView.vue'
import AdminView from '@/views/AdminView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import IRService from '@/services/IRService'
import { userBGStore } from '@/stores/boardgame'
import CollectionService from '@/services/CollectionService'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: false
      },
    },
    {
      path: '/browse',
      name: 'browse',
      component: BrowseView,
      meta: {
        requiresAuth: false
      },
      beforeEnter: async (to) => {
        const bgStore = userBGStore()
        await IRService.search('').then((response) => {
          bgStore.setCurrentResponse(response.data)
        })
      }
    },
    {
      path: '/search/:',
      name: 'browse',
      component: BrowseView,
      meta: {
        requiresAuth: false
      },
      beforeEnter: async (to) => {
        const bgStore = userBGStore()
        await IRService.search('').then((response) => {
          bgStore.setCurrentResponse(response.data)
        })
      }
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
      path: '/chatting',
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
      beforeEnter: async (to) => {
        const authStore = useAuthStore()
        const bgStore = userBGStore()
        if (isLoggedIn() && authStore.user != null) {
          console.log(authStore.user.public_id)
          await CollectionService.getCollectionsByUserID(authStore.user.public_id).then((response) => {
            bgStore.setCurrentCollections(response.data)
            console.log(bgStore.current_collections)
          })
        }
      }
    },
    {
      path: '/collection/:collection_id',
      name: 'collectionInside',
      component: CollectionInsideView,
      meta: {
        requiresAuth: false
      },
      beforeEnter: async (to) => {
        const collection_id: string = to.params.collection_id as string
        const authStore = useAuthStore()
        const bgStore = userBGStore()
        const user_id = authStore.user?.public_id
        if (user_id && isLoggedIn()) {
          await CollectionService.getCollectionItemsByPublicID(collection_id, user_id)
            .then((response) => {
              bgStore.setCurrentItems(response.data)
            })
            .catch((error) => {
              console.log(error)
              if (error.response && error.response.status === 404) {
                router.push({ 'name': 'collection' })
              }
            })
        }
      }
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
      path: '/product/:id',
      name: 'product',
      component: ProductView,
      beforeEnter: async (to) => {
        const id: string = to.params.id as string
        const bgStore = userBGStore()
        await CollectionService.getBoardgame(id)
          .then((response) => {
            bgStore.setCurrentBoardgame(response.data)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              router.push({ 'name': 'browse' })
            }
          })

        const authStore = useAuthStore()
        if (isLoggedIn() && authStore.user != null) {
          console.log(authStore.user.public_id)
          await CollectionService.getCollectionsByUserID(authStore.user.public_id).then((response) => {
            bgStore.setCurrentCollections(response.data)
          })
        }
      }
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
