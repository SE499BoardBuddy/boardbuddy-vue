<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

const emit = defineEmits(['page-changed'])
const props = defineProps({
  size: {
    type: Number,
    default: 32
  }
})
const totalItems = defineModel('total', { type: Number, required: true })
const page = defineModel('page', { type: Number, required: true })
const totalPages = ref(Math.ceil(totalItems.value / props.size))
const pageList = ref([
  {
    name: '...',
    link: 1
  }
])

function getTotalPages() {
  totalPages.value = Math.ceil(totalItems.value / props.size)
}
defineExpose({
  getTotalPages
})

function previousPage() {
  if (page.value - 1 >= 1) {
    emitPaginate(page.value - 1)
  }
}
function nextPage() {
  if (page.value + 1 <= totalPages.value) {
    emitPaginate(page.value + 1)
  }
}
function emitPaginate(p: number) {
  emit('page-changed', p)
  paginate(p)
}
function paginate(p: number) {
  page.value = p
  if (totalPages.value <= 5) {
    pageList.value = []
    for (let i = 1; i <= totalPages.value; i++) {
      pageList.value.push({
        name: String(i),
        link: i
      })
    }
  } else {
    pageList.value = []
    // const showUpto = 2
    // for (let i = 1; i <= showUpto; i++) {
    //   pageList.value.push(i)
    // }

    pageList.value.push({
      name: String(1),
      link: 1
    })
    if (page.value < 1) {
      page.value = 1
    } else if (page.value > totalPages.value) {
      page.value = totalPages.value
    }

    if (page.value - 3 <= 0) {
      pageList.value.push({
        name: '2',
        link: 2
      })
      pageList.value.push({
        name: '3',
        link: 3
      })
      pageList.value.push({
        name: '4',
        link: 4
      })
      pageList.value.push({
        name: '...',
        link: totalPages.value
      })
    } else if (page.value + 3 > totalPages.value) {
      // pageList.value.push(99, totalPages.value - 3, totalPages.value - 2, totalPages.value - 1)
      pageList.value.push({
        name: '...',
        link: 1
      })
      pageList.value.push({
        name: String(totalPages.value - 3),
        link: totalPages.value - 3
      })
      pageList.value.push({
        name: String(totalPages.value - 2),
        link: totalPages.value - 2
      })
      pageList.value.push({
        name: String(totalPages.value - 1),
        link: totalPages.value - 1
      })
    } else {
      pageList.value.push({
        name: '...',
        link: 1
      })
      pageList.value.push({
        name: String(page.value - 1),
        link: page.value - 1
      })
      pageList.value.push({
        name: String(page.value),
        link: page.value
      })
      pageList.value.push({
        name: String(page.value + 1),
        link: page.value + 1
      })
      pageList.value.push({
        name: '...',
        link: totalPages.value
      })
    }

    pageList.value.push({
      name: String(totalPages.value),
      link: totalPages.value
    })
  }
}

paginate(page.value)
getTotalPages()

onBeforeRouteUpdate(() => {
  paginate(page.value)
  getTotalPages()
})
</script>
<template>
  <ul class="inline-flex h-10 -space-x-px text-base">
    <li>
      <a
        @click.prevent.stop="previousPage"
        href="#"
        class="flex items-center justify-center h-10 px-4 leading-tight border bg-bb-black-light border-bb-black-light text-bb-white rounded-s-lg hover:bg-bb-black-lighter"
      >
        <span class="sr-only">Previous</span>
        <svg
          class="w-3 h-3 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </a>
    </li>
    <li v-for="p in pageList" :key="p.link">
      <a
        @click.stop.prevent="emitPaginate(p.link)"
        href="#"
        class="flex items-center justify-center h-10 px-4 leading-tight tracking-wide transition duration-300 text-bb-white border-bb-black-light hover:bg-bb-black-lighter"
        :class="page == p.link ? 'bg-bb-black-lighter' : 'bg-bb-black-light'"
        >{{ p.name }}</a
      >
    </li>
    <li>
      <a
        @click.prevent.stop="nextPage"
        href="#"
        class="flex items-center justify-center h-10 px-4 leading-tight bg-bb-black-light border-bb-black-light text-bb-white rounded-e-lg hover:bg-bb-black-lighter"
      >
        <span class="sr-only">Next</span>
        <svg
          class="w-3 h-3 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </a>
    </li>
  </ul>
</template>
