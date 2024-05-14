<script setup lang="ts">
import navBarVue from '@/components/NavBar.vue'
</script>

<template>
  <div
    class="min-w-screen min-h-screen bg-bb-black pt-[8vh] lg:pt-[10vh] lg:pb-[15vh] lg:px-[16%] text-bb-white overflow-hidden"
  >
    <a
      href="#"
      class="relative block overflow-hidden rounded-lg border bg-bb-black h-full p-4 sm:p-6 lg:pl-[20%]"
    >
      <br />
      <div class="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 class="text-lg font-bold text-bb-red sm:text-xl">Sora</h3>

          <p class="mt-1 text-xs font-medium text-bb-white">VERY COOL!</p>
        </div>

        <div class="hidden sm:block sm:shrink-0">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
            class="object-cover rounded-lg shadow-sm size-16"
          />
        </div>
      </div>

      <div class="mt-4">
        <p class="text-sm text-pretty text-bb-white">
          A very handsome big chad with rizz will ruin ur skibidy gayttt of your girl and mog you
          for it.
        </p>
      </div>

      <dl class="flex gap-4 mt-6 sm:gap-6">
        <div class="flex flex-col-reverse">
          <dt class="text-sm font-medium text-red-600">69</dt>
          <dd class="text-xs text-bb-white">GameOwns</dd>
        </div>

        <div class="flex flex-col-reverse">
          <dt class="text-sm font-medium text-red-600">Brabraabrarba</dt>
          <dd class="text-xs text-bb-white">~~~~~</dd>
        </div>
      </dl>
    </a>
  </div>
  <navBarVue></navBarVue>
</template>
