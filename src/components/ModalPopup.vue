<script setup lang="ts">
const props = defineProps({
  header: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['submit'])
const visible = defineModel('visible', { default: false, required: true })
</script>

<template>
  <div v-if="visible">
    <div
      class="fixed flex flex-col justify-center w-screen h-screen bg-black bg-opacity-50 z-4-modal"
      @click.self.stop="visible = false"
    >
      <div class="bg-bb-black w-[25rem] mx-auto rounded-lg text-bb-white">
        <!-- <form> -->
        <p class="p-6 text-xl font-semibold">
          {{ props.header }}
        </p>
        <div class="px-6">
          <slot name="content"></slot>
        </div>
        <div class="flex justify-end px-6 pt-4 pb-6 mt-8 space-x-2 border-t border-bb-black-light">
          <button
            @click.prevent.stop="visible = false"
            class="inline-block px-4 py-2 text-sm font-medium text-white transition duration-300 rounded-lg bg-bb-black hover:bg-bb-black-light active:bg-bb-black"
          >
            Cancel
          </button>
          <button
            @click.prevent.stop.once="emit('submit')"
            class="inline-block px-4 py-2 text-sm font-medium text-white transition duration-300 rounded-lg bg-bb-red hover:bg-bb-orange active:bg-bb-maroon"
          >
            Confirm
          </button>
        </div>
        <!-- </form> -->
      </div>
    </div>
  </div>
</template>
