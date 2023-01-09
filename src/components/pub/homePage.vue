<template>
    <main class="bg-white flex h-screen space-x-3 w-full justify-center items-center">
      <div class="relative px-6 lg:px-8">
        <div class="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
          <div>
            <div class="mb-8 flex justify-center">
              <div
                  class="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 ">
                <span class="text-gray-600">
                  赞助作者搞开发 <a @click="$sa('谢谢你，善良的陌生人。')" class="font-semibold text-indigo-600"><span
                    class="absolute inset-0" aria-hidden="true"/>去扶贫 <span aria-hidden="true">&rarr;</span></a>
                </span>
              </div>
            </div>
            <div class="space-y-2">
              <h1 class="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">用文字连接世界</h1>
              <p class="mt-6 text-lg leading-8 text-gray-600 sm:text-center">少年去游荡，中年想掘藏，老年做和尚。</p>
              <div class="mt-8 flex gap-x-4 justify-center">
                <a @click="$router.push('/editor/new')"
                   class="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-500">
                  开始创作
                  <span class="text-indigo-200" aria-hidden="true">&rarr;</span>
                </a>
                <a @click="$router.push('/home/index')"
                   class="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  开始体验
                  <span class="text-gray-400" aria-hidden="true">&rarr;</span>
                </a>
              </div>
              <button v-if="!logined" class="button w-full  text-xl font-bold mt-2" @click="$router.push('/LR')">登陆/注册</button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full rounded-lg hidden md:inline-block bg-gray-200 p-5 w-2/4">
        <div class="flex">
          <div class="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
            <svg viewBox="0 0 20 20" aria-hidden="true" class="pointer-events-none absolute w-5 fill-gray-500 transition">
              <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
            </svg>
          </div>
          <input type="text" @keyup.enter="search" v-model="key" class="w-full bg-white pl-2 text-base font-bold outline-0 rounded" placeholder='用文字连接世界'  />
          <input type="button"  @click="search" value="探索世界" class="bg-indigo-600 cursor-pointer p-2 rounded-tr-lg rounded-br-lg text-white font-bold hover:bg-indigo-500 transition-colors"/>
        </div>
      </div>
    </main>
<!--  <div class="flex h-screen w-screen items-center justify-center p-5">-->
<!--    -->
<!--  </div>-->
<!--  </div>-->
</template>

<script setup>

import {computed, ref} from "vue";
import {useStore} from "vuex";
const store = useStore()
const key = ref('')
function search() {
  //搜索this.key
  window.open('https://cn.bing.com/search?form=MOZTSB&pc=MOZI&q='+key.value)

}

let logined = ref(computed(() => store.state.user != null))
</script>

<style scoped>

</style>