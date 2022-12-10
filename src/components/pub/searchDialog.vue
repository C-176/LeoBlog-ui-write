<template>
<!--  <div class="fixed inset-0 flex items-center justify-center">-->
<!--    <button-->
<!--        type="button"-->
<!--        @click="openModal"-->
<!--        class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"-->
<!--    >-->
<!--      Open dialog-->
<!--    </button>-->
<!--  </div>-->
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
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
                class="w-full max-w-md transform text-center rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
              >
                Payment successful
              </DialogTitle>
              <div class="mt-2 w-full">

<!--                <div class=" relative w-full ">-->
                  <input type="text" id="rounded-email" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your email"/>
<!--                  <DeleteIcon class="absolute right-2"></DeleteIcon>-->
<!--                </div>-->

                <!--                <p class="text-sm text-gray-500">-->
                <!--                  Your payment has been successfully submitted. We’ve sent you-->
                <!--                  an email with all of the details of your order.-->
                <!--                </p>-->



                <div class="flex flex-col items-center justify-center w-full mx-auto bg-white rounded-lg shadow dark:bg-gray-800">
                  <ul class="flex flex-col divide-y divide">

                    <li class="flex flex-row">
                      <div class="flex items-center flex-1 py-2 px-4 cursor-pointer select-none">
<!--                        <div class="flex flex-col items-center justify-center w-10 h-10 mr-4">-->
<!--                          <a href="#" class="relative block">-->
<!--                            <img alt="profil" src="/images/person/10.jpg" class="mx-auto object-cover rounded-full h-10 w-10 "/>-->
<!--                          </a>-->
<!--                        </div>-->
                        <div class="flex-1 pl-1 mr-16">
                          <div class="font-medium dark:text-white">
                            Designer
                          </div>

                        </div>

                        <button class="flex justify-end w-24 text-right">
                          ×
                        </button>
                      </div>
                    </li>

                  </ul>

                </div>
                </div>


                <div class="mt-4 flex justify-around items-center">

                <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="closeModal"
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



<!--  &lt;!&ndash; Main modal &ndash;&gt;-->
<!--  <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">-->
<!--    <div class="relative w-full h-full max-w-md md:h-auto">-->
<!--      &lt;!&ndash; Modal content &ndash;&gt;-->
<!--      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">-->
<!--        <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">-->
<!--          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>-->
<!--          <span class="sr-only">Close modal</span>-->
<!--        </button>-->
<!--        <div class="px-6 py-6 lg:px-8">-->
<!--          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>-->
<!--          <form class="space-y-6" action="#">-->
<!--            <div>-->
<!--              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>-->
<!--              <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required>-->
<!--            </div>-->
<!--            <div>-->
<!--              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>-->
<!--              <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>-->
<!--            </div>-->
<!--            <div class="flex justify-between">-->
<!--              <div class="flex items-start">-->
<!--                <div class="flex items-center h-5">-->
<!--                  <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required>-->
<!--                </div>-->
<!--                <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>-->
<!--              </div>-->
<!--              <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>-->
<!--            </div>-->
<!--            <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>-->
<!--            <div class="text-sm font-medium text-gray-500 dark:text-gray-300">-->
<!--              Not registered? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>-->
<!--            </div>-->
<!--          </form>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->

</template>

<script setup>

import { ref,defineProps,computed } from 'vue'
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


const isOpen = ref(false)
// const isOpen = defineProps(['isOpen'])

function closeModal() {
  isOpen.value = false
}

function openModal() {
  isOpen.value = true
}


const people = [
  {id: 1, name: 'Wade Cooper'},
  {id: 2, name: 'Arlene Mccoy'},
  {id: 3, name: 'Devon Webb'},
  {id: 4, name: 'Tom Cook'},
  {id: 5, name: 'Tanya Fox'},
  {id: 6, name: 'Hellen Schmidt'},
]

let selected = ref(people[0])
let query = ref('')

let filteredPeople = computed(() =>
    query.value === ''
        ? people
        : people.filter((person) =>
            person.name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.value.toLowerCase().replace(/\s+/g, ''))
        )
)

</script>
