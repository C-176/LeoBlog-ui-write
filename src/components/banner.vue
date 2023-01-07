<template>
  <div class="bg-indigo-600 mt-14 fixed z-10  w-screen" v-if="show">
    <div class="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-center justify-between">
        <div class="flex w-0 flex-1 justify-start items-center">
          <span class="flex rounded-lg bg-indigo-600 p-2 hover:bg-indigo-500 cursor-pointer">
            <MegaphoneIcon @click="$sa('没事不要乱点','warning')" class="h-6 w-6 text-white" aria-hidden="true" />
          </span>
          <p class="ml-3 block text-left h-full align-middle font-medium text-white">
<!--            <span class="md:hidden">LeoBlog</span>-->
            世界上没有一条道路是重复的，也没有一个人生是可代替的。
<!--            <span class="hidden md:inline">世界上没有一条道路是重复的，也没有一个人生是可代替的。</span>-->
          </p>
        </div>
        <div class="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
          <a @click="$router.push('xxxxx')" class="flex font-bold items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50">探索🪲</a>
        </div>
        <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
          <button type="button" @click="show = false" class=" -mr-1 flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2">
            <span class="sr-only">Dismiss</span>
            <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MegaphoneIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import {ref} from "vue";
const router = useRouter()

const show = ref(true)
// import{context,props} from 'vue'
// props({
//   message: {
//     type: String,
//     required: true,
//   },
//   f: {
//     type: Function,
//     required: true,
//   },
// })
</script>