<script setup lang="ts">
import navBarVue from '@/components/NavBar.vue'
</script>
<template class="bg-bb-black">
  <headerVue></headerVue>

  <article class="flex bg-bb-black transition lg:pl-[16%] h-full py-[13vh]">
    <div class="flex flex-col justify-between mx-auto w-[80%]">
      <div class="hidden sm:block sm:shrink-0">
        <img alt="" :src="item?.image" class="object-cover w-full rounded-lg h-96" />
      </div>

      <div class="border-s border-gray-900/10 sm:border-l-transparent sm:p-6">
        <a href="#">
          <h3 class="font-bold uppercase text-bb-white">
            {{ item?.name }} ({{ item?.yearpublished }})
          </h3>
        </a>

        <p class="mt-2 line-clamp-3 text-sm/relaxed text-bb-white">
          {{ item?.description }}
        </p>

        <br />
        <div class="flow-root">
          <dl class="-my-3 text-sm divide-y divide-bb-black-light">
            <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Designer</dt>
              <dd class="text-bb-white sm:col-span-2">{{ item?.boardgamedesigner }}</dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 divide-bb-black-light sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Playing Time</dt>
              <dd class="text-bb-white sm:col-span-2">
                {{ item?.minplaytime }}-{{ item?.maxplaytime }} Min
              </dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Age</dt>
              <dd class="text-bb-white sm:col-span-2">{{ item?.age }}+</dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 divide-bb-black-light sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Complexity rating</dt>
              <dd class="text-bb-white sm:col-span-2">Weight: 2.46 / 5</dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Description</dt>
              <dd class="text-bb-white sm:col-span-2">
                {{ item?.description }}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div class="mt-4 sm:flex sm:items-end sm:justify-end">
        <a
          href="#"
          class="block px-5 py-3 text-xs font-bold text-center uppercase transition duration-300 rounded-lg text-bb-white bg-bb-red hover:bg-bb-orange"
        >
          Add to collection
        </a>
      </div>
    </div>
  </article>

  <navBarVue></navBarVue>
</template>
