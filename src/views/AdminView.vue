<script setup lang="ts">
import headerVue from '@/components/HeaderBar.vue'
import navBarVue from '@/components/NavBar.vue'
</script>
<template>
  <headerVue></headerVue>
  <div
    class="text-2xl font-semibold text-bb-white h-[12%] justify-between bg-bb-black fixed px-12 top-0 w-[68%] left-[16%] flex flex-row"
  >
    <p
      class="w-full my-auto text-2xl font-semibold leading-none text-left h-fit text-bb-white lg:w-auto"
    >
      Admin
    </p>
  </div>
  <div
    class="min-w-screen min-h-screen bg-bb-black pt-[8vh] lg:pt-[10vh] lg:pb-[15vh] lg:px-[16%] text-bb-white overflow-hidden"
  >
    <div class="py-4 lg:w-[90%] lg:mx-auto">Put stuff here</div>
  </div>
  <navBarVue class="hidden lg:block"></navBarVue>
</template>
