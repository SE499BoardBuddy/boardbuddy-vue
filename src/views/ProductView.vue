<script setup lang="ts">
import navBarVue from '@/components/NavBar.vue'
</script>
<template class="bg-bb-black">
  <article class="flex bg-bb-black transition lg:pl-[16%] h-full">
    <div class="flex flex-1 flex-col justify-between">
      <div class="hidden sm:block sm:shrink-0">
        <img
          alt=""
          src="https://cdn.arstechnica.net/wp-content/uploads/2019/03/Wingspan17-800x600.jpg"
          class="h-96 w-full object-cover"
        />
      </div>

      <div class="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
        <a href="#">
          <h3 class="font-bold uppercase text-bb-white">Wingspan (2019)</h3>
        </a>

        <p class="mt-2 line-clamp-3 text-sm/relaxed text-bb-white">
          Attract a beautiful and diverse collection of birds to your wildlife preserve.
        </p>

        <br />
        <div class="flow-root">
          <dl class="-my-3 divide-y divide-bb-black-light text-sm">
            <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">DesignerElizabeth</dt>
              <dd class="text-bb-white sm:col-span-2">Hargrave</dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 divide-bb-black-light sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Playing Time</dt>
              <dd class="text-bb-white sm:col-span-2">40–70 Min</dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Age</dt>
              <dd class="text-bb-white sm:col-span-2">10+</dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 divide-bb-black-light sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Complexity rating</dt>
              <dd class="text-bb-white sm:col-span-2">Weight: 2.46 / 5</dd>
            </div>

            <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-bb-white">Description</dt>
              <dd class="text-bb-white sm:col-span-2">
                Wingspan is a competitive, medium-weight, card-driven, engine-building board game from Stonemaier Games. It's designed by Elizabeth Hargrave and features over 170 birds illustrated by Beth Sobel, Natalia Rojas, and Ana Maria Martinez.


              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div class="sm:flex sm:items-end sm:justify-end">
        <a
          href="#"
          class="block bg-bb-red px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
        >
          Add to collection
        </a>
      </div>
    </div>
  </article>

  <navBarVue></navBarVue>
</template>
