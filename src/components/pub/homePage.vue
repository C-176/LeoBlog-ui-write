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
                   class="inline-block rounded-lg flex items-center bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-500">
                  <icon src="edxgdhxu"></icon>开始创作
                  <span class="text-indigo-200" aria-hidden="true">&rarr;</span>
                </a>
                <a @click="$router.push('/home/index')"
                   class="inline-block rounded-lg  flex items-center px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  <icon src="hezrwbzv"></icon>开始体验
                  <span class="text-gray-400" aria-hidden="true">&rarr;</span>
                </a>
              </div>
              <button v-if="!logined" class="button w-full  text-xl font-bold mt-2" @click="$router.push('/LR')">登陆/注册</button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full rounded-lg hidden md:inline-block bg-gray-200 p-5 w-2/4">
        <div class="flex ">

          <icon src="xfftupfv" trigger="loop" class1="mr-0.5 "></icon>
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