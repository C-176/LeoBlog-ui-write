<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
      <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25"/>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
            class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
          >
            <DialogPanel
                class="w-full max-w-md transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >

              <div class=" w-full">

                <div class=" relative mb-2 w-full flex items-center justify-between space-x-2">
                  <icon src="zniqnylq" trigger="loop"></icon>
                  <input type="text"
                         v-model="searchText"
                         class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                         placeholder="请输入搜索内容"
                         @keyup.enter="search(searchText)"
                  />
                </div>
                <div class="text-indigo-600 text-left p-2">最近搜索</div>
                <div class="space-y-1 flex-col justify-start items-center">
                  <div v-for="item in history" :key="item.id"
                       class="w-full hover:text-white hover:bg-indigo-600 relative flex items-center justify-between p-3 pl-5 bg-gray-100 transition duration-300 rounded-xl text-left">
                    <span class="text cursor-pointer"
                          @click="search(item.searchText)"><span class="text-base">{{ item.searchText }}</span>·<span class="text-gray-500">{{ item.searchTime }}</span></span>
                    <button class="rounded-xl z-20 hover:text-white h-8 w-8 text-center hover:bg-indigo-500"
                            @click="deleteHistory(item.searchText)">
                      ✖
                    </button>

                  </div>
                </div>
              </div>


              <div class="mt-4 flex justify-around items-center">

                <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="search(searchText)"
                >
                  搜索
                </button>
                <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="closeModal"
                >
                  取消
                </button>
              </div>


            </DialogPanel>

          </TransitionChild>

        </div>
      </div>
    </Dialog>
  </TransitionRoot>

</template>

<script setup>

import {ref,  computed, onMounted} from 'vue'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

import {CheckIcon, ChevronUpDownIcon} from '@heroicons/vue/20/solid'
import router from "@/router";
import Swal from "sweetalert2";

const history = ref([])
const searchItm = ref({
  searchTime: '',
  searchText: ''
})
onMounted(() => {
  history.value = JSON.parse(localStorage.getItem('history') || '[]')
})

function addHistory(text) {
  history.value = history.value.filter((x) => x.searchText !== text)
  // 向history数组中添加元素
  history.value.unshift({
    searchTime: new Date().toLocaleString(),
    searchText: text
  })
  if (history.value.length > 10) {
    history.value.pop()
  }
  localStorage.setItem('history', JSON.stringify(history.value))
}

function deleteHistory(text) {
  // 向history数组中删除元素
  history.value = history.value.filter((item) => item.searchText !== text)
  localStorage.setItem('history', JSON.stringify(history.value))

}

const emit = defineEmits(['closeSearch'])
const searchText = ref('')
const search = (text) => {
  if (text) {
    addHistory(text)
    router.push('/search/' + text)
    emit('closeSearch')
  } else {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      width: 300,
      showConfirmButton: false,
      timer: 2000
    })

    Toast.fire({
      icon:'error',
      text:'请输入有效内容'
    })
  }

}
// const isOpen = ref(false)
// 从父组件接受prop isOpen
const {isOpen} = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

function closeModal() {
  //在setup中唤醒父组件closeModal方法
  emit('closeSearch')

}

//
// const people = [
//   {id: 1, name: 'Wade Cooper'},
//   {id: 2, name: 'Arlene Mccoy'},
//   {id: 3, name: 'Devon Webb'},
//   {id: 4, name: 'Tom Cook'},
//   {id: 5, name: 'Tanya Fox'},
//   {id: 6, name: 'Hellen Schmidt'},
// ]


let query = ref('')
//
// let filteredPeople = computed(() =>
//     query.value === ''
//         ? people
//         : people.filter((person) =>
//             person.name
//                 .toLowerCase()
//                 .replace(/\s+/g, '')
//                 .includes(query.value.toLowerCase().replace(/\s+/g, ''))
//         )
// )

</script>
