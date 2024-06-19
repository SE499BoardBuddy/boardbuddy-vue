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

import NProgress from 'nprogress'

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
      path: '/search',
      name: 'browse',
      component: BrowseView,
      meta: {
        requiresAuth: false
      },
      beforeEnter: async (to) => {
        let query = to.query.query as string
        let page = to.query.page as string

        if (typeof query != 'string' || query.length == 0) {
          query = ''
        }
        if (typeof page != 'string' || page.length == 0) {
          page = '1'
        }

        // console.log('query', query)
        // console.log('page', page)

        const bgStore = userBGStore()
        NProgress.set(0.7)
        await IRService.search(query, parseInt(page)).then((response) => {
          bgStore.setCurrentResponse(response.data)
          bgStore.setCurrentSearchResults(response.data.results)
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
          NProgress.set(0.7)
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
          NProgress.set(0.7)
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
        NProgress.set(0.5)
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
          NProgress.set(0.7)
          await CollectionService.getCollectionToAdd(authStore.user.public_id, id).then((response) => {
            console.log(response.data)
            bgStore.setCurrentCollectionsToAdd(response.data.collections)
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
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

const isLoggedIn = () => {
  return localStorage.getItem('access_token') && localStorage.getItem('user')
}

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // console.log(isLoggedIn())
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
router.afterEach(() => {
  NProgress.done()
})

export default router
