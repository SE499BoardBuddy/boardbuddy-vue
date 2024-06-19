<script setup lang="ts">
import navBarVue from '@/components/NavBar.vue'
import headerVue from '@/components/HeaderBar.vue'
import { ref } from 'vue'
import { onBeforeRouteUpdate, RouterLink, useRoute, useRouter } from 'vue-router'
import { userBGStore } from '@/stores/boardgame'
import IRService from '@/services/IRService'
import type { Boardgame } from '@/type'

import PaginationCustom from '@/components/PaginationCustom.vue'
import { storeToRefs } from 'pinia'

const filterList = ref([
  'Release date',
  'Designer',
  'Publisher',
  'Minimum age',
  'Playing time',
  'Player count',
  'Rating score'
])

const query_term = ref('')
const bgStore = userBGStore()
const res = storeToRefs(bgStore).res
const totalItems = ref(1000)
const searched_item = storeToRefs(bgStore).current_search_results

const route = useRoute()
const router = useRouter()
const current_page = ref(1)

const paginationRefUp = ref<InstanceType<typeof PaginationCustom> | null>(null)
const paginationRefDown = ref<InstanceType<typeof PaginationCustom> | null>(null)

async function search(query: string) {
  current_page.value = 1
  await IRService.search(query, 1).then((response) => {
    console.log('search')
    router.replace({
      name: 'browse',
      query: {
        query: query,
        page: 1
      }
    })
    bgStore.setCurrentResponse(response.data)
    bgStore.setCurrentSearchResults(response.data.results)
    setTerm()
    console.log('search finish')
  })
}

function setTerm() {
  if (bgStore.res != null) {
    totalItems.value = bgStore.res.total_hit
    paginationRefUp.value?.getTotalPages()
    paginationRefDown.value?.getTotalPages()
    // console.log('setTerm', totalItems.value)
  }
  // console.log('setTerm', current_page.value)
}

async function goToPage(page: any) {
  await IRService.search(query_term.value, page).then((response) => {
    current_page.value = page
    router.replace({
      name: 'browse',
      query: {
        query: query_term.value,
        page: page
      }
    })
    // console.log('then', current_page.value)
    bgStore.setCurrentResponse(response.data)
    bgStore.setCurrentSearchResults(response.data.results)
    setTerm()
  })
  // console.log('after', current_page.value)
}

function setQuery() {
  if (route.query.query != null) {
    query_term.value = route.query.query as string
  } else {
    query_term.value = ''
  }
  if (route.query.page != undefined) {
    current_page.value = parseInt(route.query.page as string)
  } else {
    current_page.value = 1
  }
}

setTerm()
setQuery()

onBeforeRouteUpdate(() => {
  setTerm()
})
</script>
<template>
  <headerVue></headerVue>
  <div
    class="text-2xl font-semibold text-bb-white h-[12%] z-1-header px-4 bg-bb-black fixed lg:px-12 w-full lg:top-0 top-[8vh] lg:w-[68%] lg:left-[16%] flex flex-row"
  >
    <p
      class="my-auto hidden lg:flex md:flex text-2xl w-[20%] font-semibold leading-none text-left h-fit text-bb-white"
    >
      Browse
    </p>
    <form
      class="lg:w-[60%] w-full leading-normal h-fit my-auto text-bb-white mx-auto"
      @submit.prevent="search(query_term)"
    >
      <label for="default-search" class="mb-2 text-sm font-medium sr-only text-bb-white"
        >Search</label
      >
      <div class="relative">
        <div class="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
          <svg
            class="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          v-model="query_term"
          type="search"
          id="default-search"
          class="block w-full h-full px-4 py-2 text-sm border rounded-lg border-bb-black-light ps-10 bg-bb-black focus:ring-bb-red focus:border-bb-red"
          placeholder="Type here..."
        />
        <button
          type="submit"
          class="absolute bottom-0 h-full p-2 text-sm font-medium transition duration-300 ease-in-out rounded-tr-lg rounded-br-lg bg-bb-red end-0 hover:bg-bb-orange active:bg-bb-maroon"
        >
          Search
        </button>
      </div>
    </form>
    <div class="w-[20%] hidden"></div>
  </div>

  <div
    class="min-w-screen min-h-screen bg-bb-black px-2 pt-[16vh] lg:pt-[12vh] lg:px-[16%] text-bb-white overflow-hidden"
  >
    <div class="w-full h-full mx-auto py-8 lg:w-[90%]">
      <div class="flex flex-row justify-center w-full mb-8">
        <PaginationCustom
          ref="paginationRefUp"
          @page-changed="goToPage"
          :page="current_page"
          :size="32"
          :total="totalItems"
        ></PaginationCustom>
      </div>
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <RouterLink
          :to="{ name: 'product', params: { id: item.id } }"
          v-for="item in searched_item"
          :key="item.id"
          class="px-2 pt-2 pb-4 text-left transition duration-300 rounded-lg hover:bg-bb-black-light group active:scale-95 hover:scale-105"
        >
          <div class="flex flex-row h-[6rem] md:h-[16rem] lg:h-[10rem] mb-2">
            <div class="w-full">
              <img
                :src="item.image"
                class="object-cover object-right-top w-full h-full transition duration-300 rounded-lg group-hover:opacity-100 opacity-80"
              />
            </div>
          </div>
          <p class="text-lg font-medium truncate">{{ item.name }}</p>
        </RouterLink>
      </div>
      <div class="flex flex-row justify-center w-full mt-8">
        <PaginationCustom
          ref="paginationRefDown"
          @page-changed="goToPage"
          :page="current_page"
          :size="32"
          :total="totalItems"
        ></PaginationCustom>
      </div>
    </div>
  </div>
  <div
    class="fixed top-0 right-0 h-full w-[16%] hidden bg-bb-black border-l-2 pr-2 border-bb-black-light text-bb-white lg:flex flex-col"
  >
    <div class="w-full pl-4 h-[12%] text-lg font-medium flex flex-col justify-center">Filters</div>
    <div class="flex flex-col" v-for="filter in filterList" :key="filter">
      <div class="py-2 pl-4 text-base font-medium">{{ filter }}</div>
      <div class="pl-6">
        <input
          class="px-2 border-2 rounded-lg bg-bb-black border-bb-black-light"
          type="text"
          name=""
          id=""
        />
      </div>
    </div>
  </div>
  <navBarVue></navBarVue>
</template>
