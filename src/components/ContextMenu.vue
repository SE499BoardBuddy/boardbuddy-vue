//ContextMenu.vue
<script setup lang="ts">
const isMenuShown = defineModel('isMenuShown', { default: false, required: true })
const { actions, x, y } = defineProps(['actions', 'x', 'y'])
const emit = defineEmits(['action-clicked'])

const emitAction = (action: any) => {
  emit('action-clicked', action)
}
</script>

<template>
  <div
    v-if="isMenuShown"
    class="shadow-[0_0_4px_4px_rgba(0,0,0,0.15)] absolute font-normal text-base py-2 rounded-lg border-[#6b4a78] z-3-menu bg-bb-black-light text-bb-white min-w-[200px] context-menu"
    :style="{ top: y + 'px', left: x + 'px' }"
  >
    <div
      v-for="action in actions"
      :key="action.action"
      @click="emitAction(action.action)"
      class="hover:bg-[#5f426c] group py-2 px-4 cursor-pointer flex items-center gap-4"
    >
      <div v-if="action.icon != null && action.icon != undefined && action.icon.length != 0">
        <img class="w-6 h-6 opacity-80 group-hover:opacity-100 text-bb-white" :src="action.icon" />
      </div>
      <div>{{ action.label }}</div>
    </div>
  </div>
</template>
