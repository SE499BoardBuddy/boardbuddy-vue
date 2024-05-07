<script setup lang="ts">
import navBarVue from '@/components/NavBar.vue'
import headerVue from '@/components/HeaderBar.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const colList = ref<number[]>([])
for (var i = 1; i <= 30; i++) {
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
          Your Collections
        </p>
        <button
          class="w-12 h-12 my-auto transition duration-300 rounded-full hover:bg-bb-black-light active:scale-90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 mx-auto"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
      <div class="h-[90%] overflow-x-hidden overflow-y-auto py-8 lg:p-8">
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <RouterLink
            :to="{ name: 'collectionInside' }"
            v-for="col in colList"
            :key="col"
            class="px-2 pt-2 pb-4 text-left transition duration-300 rounded-lg hover:bg-bb-black-light group active:scale-90 hover:scale-[1.05]"
          >
            <div class="flex flex-row h-[6rem] lg:h-[9rem] mb-2">
              <div class="w-[60%]">
                <img
                  src="https://cf.geekdo-images.com/jAbc4LK0aCkV-JDLuZAmog__imagepagezoom/img/0eSIrSamdXQ1tIrXVtIoUfmtJCQ=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic7774173.jpg"
                  class="object-cover object-right-top w-full h-full transition duration-300 border-r-2 rounded-tl-lg rounded-bl-lg group-hover:opacity-100 opacity-80 border-bb-black"
                />
              </div>
              <div class="w-[40%]">
                <div class="h-[50%]">
                  <img
                    src="https://cf.geekdo-images.com/9cJf4kd_HZQo6NunfJlo9w__imagepagezoom/img/RTwSjC7brscqPjN-fQouXW8TV3w=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic175966.jpg"
                    class="object-cover object-right-top w-full h-full transition duration-300 border-b-2 border-l-2 rounded-tr-lg border-bb-black group-hover:opacity-100 opacity-80"
                  />
                </div>
                <div class="h-[50%]">
                  <img
                    src="https://cf.geekdo-images.com/A_XP2_VN3ugyqPhezowB_w__imagepagezoom/img/SzSyZ5xHRwz0gYOsXohJkczdri4=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic8026369.png"
                    class="object-cover object-right-top w-full h-full transition duration-300 border-t-2 border-l-2 rounded-br-lg border-bb-black group-hover:opacity-100 opacity-80"
                  />
                </div>
              </div>
            </div>
            <p class="text-lg font-medium truncate">Collections</p>
            <p class="text-xs">123 Games</p>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
  <navBarVue></navBarVue>
</template>
