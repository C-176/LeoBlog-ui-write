<template>
  <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 ">
    <div class="flex flex-1 justify-between sm:hidden">
      <a @click="getNext" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
      <a @click="getPrevious" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between bg-white">
      <div >
        <p class="text-sm text-gray-700">
          Showing
          {{ ' ' }}
          <span class="font-medium">{{ currentPage }}</span>
          {{ ' ' }}
          to
          {{ ' ' }}
          <span class="font-medium">{{ pageSize }}</span>
          {{ ' ' }}
          of
          {{ ' ' }}
          <span class="font-medium">{{total}}</span>
          {{ ' ' }}
          results
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <a href="#"
             class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true"/>
          </a>
          <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
          <a href="#"
             class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
            <span class="sr-only">Next</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true"/>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'

export default {
  name: "lb-pagination",
  props: {
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 1,
    },
    currentPage: {
      type: Number,
      default: 0,
    },
    getNext: {
      type: Function,
      default: () => {},
    },
    getPrevious: {
      type: Function,
      default: () => {},
    },

  },
}
</script>

<style scoped>

</style>