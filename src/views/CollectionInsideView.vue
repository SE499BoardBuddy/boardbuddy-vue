<script setup lang="ts">
import navBarVue from '@/components/NavBar.vue'
import headerVue from '@/components/HeaderBar.vue'
import { ref } from 'vue'
const colList = ref<number[]>([])
for (var i = 1; i <= 4; i++) {
  colList.value.push(i)
}
</script>
<template>
  <headerVue></headerVue>
  <div
    class="w-full h-full bg-bb-black pt-[8vh] pb-[10vh] lg:pt-0 lg:pb-0 lg:pl-[17%] text-bb-white overflow-hidden"
  >
    <div class="w-full h-full px-4 pb-2 pt-2 lg:pt-8 lg:w-[90%] mx-auto">
      <div class="flex flex-row h-[10%] border-b-2 border-bb-black-light justify-between">
        <p class="my-auto text-2xl font-semibold leading-none text-left h-fit text-bb-white">
          Name here
        </p>
      </div>
      <div class="h-[90%] overflow-x-hidden overflow-y-auto py-8 lg:p-8">
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <button
            v-for="col in colList"
            :key="col"
            class="px-2 pt-2 pb-4 text-left transition duration-300 rounded-lg hover:bg-bb-black-light group active:scale-90 hover:scale-[1.05]"
          >
            <div class="flex flex-row h-[6rem] lg:h-[9rem] mb-2">
              <div class="w-full">
                <img
                  src="https://cf.geekdo-images.com/jAbc4LK0aCkV-JDLuZAmog__imagepagezoom/img/0eSIrSamdXQ1tIrXVtIoUfmtJCQ=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic7774173.jpg"
                  class="object-cover object-right-top w-full h-full transition duration-300 rounded-lg group-hover:opacity-100 opacity-80"
                />
              </div>
            </div>
            <p class="text-lg font-medium truncate">Game name here</p>
          </button>
        </div>
      </div>
    </div>
  </div>
  <navBarVue></navBarVue>
</template>
