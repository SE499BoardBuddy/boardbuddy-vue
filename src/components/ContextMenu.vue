//ContextMenu.vue
<template>
  <div
    class="absolute border-2 rounded-lg border-[#6b4a78] z-50 bg-bb-black-light text-bb-white min-w-[150px] context-menu"
    :style="{ top: y + 'px', left: x + 'px' }"
  >
    <div
      v-for="action in actions"
      :key="action.action"
      @click="emitAction(action.action)"
      class="hover:bg-[#6b4a78]"
    >
      {{ action.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
const { actions, x, y } = defineProps(['actions', 'x', 'y'])
const emit = defineEmits(['action-clicked'])

const emitAction = (action: any) => {
  emit('action-clicked', action)
}
</script>

<style scoped>
.context-menu {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.context-menu div {
  padding: 10px;
  cursor: pointer;
}
</style>
