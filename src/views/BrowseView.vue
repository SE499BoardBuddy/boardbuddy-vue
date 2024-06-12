<script setup lang="ts">
import navBarVue from '@/components/NavBar.vue'
import headerVue from '@/components/HeaderBar.vue'
import { onBeforeUpdate, ref } from 'vue'
import { onBeforeRouteUpdate, RouterLink } from 'vue-router'
import { userBGStore } from '@/stores/boardgame'
import IRService from '@/services/IRService'
import router from '@/router'
import type { Boardgame } from '@/type'
const colList = ref<number[]>([])
for (var i = 1; i <= 30; i++) {
  colList.value.push(i)
}
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
const searched_item = ref<Array<Boardgame>>([])
const bgStore = userBGStore()

async function search(query: string) {
  // console.log(query_term.value)
  await IRService.search(query).then((response) => {
    console.log('search')
    bgStore.setCurrentResponse(response.data)
    console.log(bgStore.res)
    setTerm()
    // router.go(0)
  })
}

function setTerm() {
  // needSuggestion.value = false
  if (bgStore.res != null && bgStore.res.suggest != null) {
    // console.log(recipeStore.res.suggest.Name)
    // var text = ''
    // recipeStore.res.suggest.Name.forEach((element) => {
    //   if (element.options != null && element.options.length != 0) {
    //     console.log(element.options[0].text)
    //     text = text + ' ' + element.options[0].text
    //     needSuggestion.value = true
    //   } else {
    //     text = text + ' ' + element.text
    //   }
    // })
    // suggested_term.value = text.trim()
    // console.log('suggested_term: ' + suggested_term.value)
    if (bgStore.res.results != null) {
      searched_item.value = bgStore.res.results
    }
    console.log(searched_item.value)
  }
}

setTerm()

onBeforeRouteUpdate(() => {
  setTerm()
})
</script>
<template>
  <headerVue></headerVue>
  <div
    class="text-2xl font-semibold text-bb-white h-[12%] z-10 px-4 bg-bb-black fixed lg:px-12 w-full lg:top-0 top-[8vh] lg:w-[68%] lg:left-[16%] flex flex-row"
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
          required
        />
        <button
          type="submit"
          class="absolute bottom-0 h-full p-2 text-sm font-medium transition duration-300 ease-in-out rounded-tr-lg rounded-br-lg bg-bb-red end-0 hover:bg-bb-orange"
        >
          Search
        </button>
      </div>
    </form>
    <div class="w-[20%] hidden"></div>
  </div>

  <div
    class="min-w-screen min-h-screen bg-bb-black px-2 pt-[16vh] lg:pt-[12vh] lg:pb-[15vh] lg:px-[16%] text-bb-white overflow-hidden"
  >
    <div class="w-full h-full mx-auto py-8 lg:w-[90%]">
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <RouterLink
          :to="{ name: 'product', params: { id: item.id } }"
          v-for="item in searched_item"
          :key="item.name"
          class="px-2 pt-2 pb-4 text-left transition duration-300 rounded-lg hover:bg-bb-black-light group active:scale-90 hover:scale-105"
        >
          <div class="flex flex-row h-[6rem] md:h-[16rem] lg:h-[9rem] mb-2">
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
