<script setup lang="ts">
import navBarVue from '@/components/NavBar.vue'
import headerVue from '@/components/HeaderBar.vue'
import { ref } from 'vue'
import { onBeforeRouteUpdate, RouterLink, useRoute, useRouter } from 'vue-router'
import { userBGStore } from '@/stores/boardgame'
import IRService from '@/services/IRService'

import PaginationCustom from '@/components/PaginationCustom.vue'
import { storeToRefs } from 'pinia'

const queryTerm = ref('')
const bgStore = userBGStore()
const totalItems = ref(1000)
const searchedItems = storeToRefs(bgStore).current_search_results

const route = useRoute()
const router = useRouter()
const currentPage = ref(1)

const paginationRefUp = ref<InstanceType<typeof PaginationCustom> | null>(null)
const paginationRefDown = ref<InstanceType<typeof PaginationCustom> | null>(null)

async function search(query: string) {
  currentPage.value = 1
  await IRService.search(query, 1, 0, 0, 0, 0, 0, 0, 0, '', '', '').then((response) => {
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

async function filter() {
  currentPage.value = 1
  await IRService.search(
    queryTerm.value,
    1,
    filterMinAge.value,
    filterMinPlayers.value,
    filterMaxPlayers.value,
    filterMinPlaytime.value,
    filterMaxPlaytime.value,
    filterMinYear.value,
    filterMaxYear.value,
    filterDesigner.value,
    filterPublisher.value,
    filterCategory.value.value
  ).then((response) => {
    console.log('search')
    router.replace({
      name: 'browse',
      query: {
        query: queryTerm.value,
        page: 1
      }
    })
    bgStore.setCurrentResponse(response.data)
    bgStore.setCurrentSearchResults(response.data.results)
    setTerm()
    console.log('filter finish')
  })
}

function setTerm() {
  if (bgStore.res != null) {
    totalItems.value = bgStore.res.total_hit
    paginationRefUp.value?.getTotalPages()
    paginationRefDown.value?.getTotalPages()
    // console.log('setTerm', totalItems.value)

    let cate_list = bgStore.res.categories
    if (cate_list != null && cate_list != undefined && cate_list.length != 0) {
      categoriesList.value = []
      for (let i = 0; i < cate_list.length; i++) {
        categoriesList.value.push({
          name: cate_list[i],
          id: i,
          value: cate_list[i]
        })
      }
    }
  }
  // console.log('setTerm', currentPage.value)
}

async function goToPage(page: any) {
  await IRService.search(
    queryTerm.value,
    page,
    filterMinAge.value,
    filterMinPlayers.value,
    filterMaxPlayers.value,
    filterMinPlaytime.value,
    filterMaxPlaytime.value,
    filterMinYear.value,
    filterMaxYear.value,
    filterDesigner.value,
    filterPublisher.value,
    filterCategory.value.value
  ).then((response) => {
    currentPage.value = page
    router.replace({
      name: 'browse',
      query: {
        query: queryTerm.value,
        page: page
      }
    })
    // console.log('then', currentPage.value)
    bgStore.setCurrentResponse(response.data)
    bgStore.setCurrentSearchResults(response.data.results)
    setTerm()
  })
  // console.log('after', currentPage.value)
}

function setQuery() {
  if (route.query.query != null) {
    queryTerm.value = route.query.query as string
  } else {
    queryTerm.value = ''
  }
  if (route.query.page != undefined) {
    currentPage.value = parseInt(route.query.page as string)
  } else {
    currentPage.value = 1
  }
}

const categoriesList = ref([
  {
    name: 'test1',
    id: 1,
    value: ''
  }
])
const filterCategory = ref({
  name: 'test1',
  id: 1,
  value: ''
})
const filterMinPlaytime = ref(0)
const filterMaxPlaytime = ref(0)
const filterMinPlayers = ref(0)
const filterMaxPlayers = ref(0)
const filterMinYear = ref(0)
const filterMaxYear = ref(0)
const filterMinAge = ref(0)
const filterDesigner = ref('')
const filterPublisher = ref('')

function clearCategory() {
  filterCategory.value = {
    name: 'test1',
    id: 1,
    value: ''
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
      @submit.prevent="search(queryTerm)"
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
          v-model="queryTerm"
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
          :page="currentPage"
          :size="32"
          :total="totalItems"
        ></PaginationCustom>
      </div>
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <RouterLink
          :to="{ name: 'product', params: { id: item.id } }"
          v-for="item in searchedItems"
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
          :page="currentPage"
          :size="32"
          :total="totalItems"
        ></PaginationCustom>
      </div>
    </div>
  </div>
  <div
    class="fixed top-0 right-0 h-full w-[16%] hidden overflow-y-auto bg-bb-black border-l-2 pr-2 border-bb-black-light text-bb-white lg:flex flex-col"
  >
    <form @submit.prevent="filter">
      <div
        class="w-full px-4 h-[12%] text-lg font-medium items-center justify-between flex flex-row"
      >
        <span>Filters</span>
        <button
          type="submit"
          class="px-4 py-2 text-sm font-medium transition duration-300 ease-in-out rounded-lg h-fit bg-bb-red end-0 hover:bg-bb-orange active:bg-bb-maroon"
        >
          Filter
        </button>
      </div>

      <div class="flex flex-col w-full mb-2">
        <div class="py-2 pl-4 text-base font-medium">Play Time</div>
        <div class="flex flex-row w-full gap-1 pl-6">
          <input
            min="0"
            v-model="filterMinPlaytime"
            class="w-2/5 px-2 border-2 rounded-lg bg-bb-black border-bb-black-light"
            type="number"
          />
          <span>to</span>
          <input
            min="0"
            v-model="filterMaxPlaytime"
            class="w-2/5 px-2 border-2 rounded-lg bg-bb-black border-bb-black-light"
            type="number"
          />
        </div>
      </div>
      <div class="flex flex-col w-full mb-2">
        <div class="py-2 pl-4 text-base font-medium">Player Count</div>
        <div class="flex flex-row w-full gap-1 pl-6">
          <input
            min="0"
            v-model="filterMinPlayers"
            class="w-2/5 px-2 border-2 rounded-lg bg-bb-black border-bb-black-light"
            type="number"
          />
          <span>to</span>
          <input
            min="0"
            v-model="filterMaxPlayers"
            class="w-2/5 px-2 border-2 rounded-lg bg-bb-black border-bb-black-light"
            type="number"
          />
        </div>
      </div>
      <div class="flex flex-col w-full mb-2">
        <div class="py-2 pl-4 text-base font-medium">Year Released</div>
        <div class="flex flex-row w-full gap-1 pl-6">
          <input
            min="0"
            v-model="filterMinYear"
            class="w-2/5 px-2 border-2 rounded-lg bg-bb-black border-bb-black-light"
            type="number"
          />
          <span>to</span>
          <input
            min="0"
            v-model="filterMaxYear"
            class="w-2/5 px-2 border-2 rounded-lg bg-bb-black border-bb-black-light"
            type="number"
          />
        </div>
      </div>
      <div class="flex flex-col w-full mb-2">
        <div class="py-2 pl-4 text-base font-medium">Minimum Age</div>
        <div class="flex flex-row w-full gap-1 pl-6">
          <input
            min="0"
            v-model="filterMinAge"
            class="px-2 border-2 rounded-lg bg-bb-black border-bb-black-light"
            type="number"
          />
        </div>
      </div>
      <div class="flex flex-col w-full mb-2">
        <div class="py-2 pl-4 text-base font-medium">Designer</div>
        <div class="flex flex-row w-full gap-1 pl-6">
          <input
            v-model="filterDesigner"
            class="px-2 border-2 rounded-lg bg-bb-black border-bb-black-light"
            type="text"
          />
        </div>
      </div>
      <div class="flex flex-col w-full mb-2">
        <div class="py-2 pl-4 text-base font-medium">Publisher</div>
        <div class="flex flex-row w-full gap-1 pl-6">
          <input
            v-model="filterPublisher"
            class="px-2 border-2 rounded-lg bg-bb-black border-bb-black-light"
            type="text"
          />
        </div>
      </div>

      <div class="flex flex-col w-full pb-4">
        <div class="flex flex-row items-center justify-between px-4 py-2 text-base font-medium">
          <span>Categories</span>
          <button
            @click.prevent="clearCategory"
            class="px-4 py-2 text-sm font-medium transition duration-300 ease-in-out rounded-lg h-fit bg-bb-red end-0 hover:bg-bb-orange active:bg-bb-maroon"
          >
            Clear
          </button>
        </div>
        <div class="flex flex-col pl-6 overflow-y-auto h-[12rem]">
          <div v-for="col in categoriesList" :key="col.id" class="flex items-center gap-2 p-1">
            <label :for="col.id + col.name" class="flex items-center gap-4 cursor-pointer">
              <input
                class="box-content h-2 w-2 cursor-pointer appearance-none ring-bb-white rounded-full border-[5px] border-bb-black bg-bb-black bg-clip-padding outline-none ring-2 checked:ring-bb-red checked:bg-bb-red transition duration-75"
                type="radio"
                :id="col.id + col.name"
                :value="col"
                v-model="filterCategory"
              />
              <div class="flex flex-col justify-center text-left text-bb-white">
                <span>{{ col.name }}</span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </form>
  </div>
  <navBarVue></navBarVue>
</template>
