<template>
  <main id="show" class="bg-white flex h-screen space-x-0 w-screen justify-center items-center">
    <div class="relative px-6 lg:px-8">
      <div class="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
        <div>
          <div class="mb-8 flex justify-center">
            <div
                class="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 ">
                <span class="text-gray-600">
                  赞助作者搞开发 <a @click="$st('谢谢你，善良的陌生人。','success')"
                                    class="font-semibold text-indigo-600"><span
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
                <icon src="edxgdhxu" trigger="loop"></icon>
                开始创作
                <span class="text-indigo-200" aria-hidden="true">&rarr;</span>
              </a>
              <a @click="$router.push('/home/index')"
                 class="inline-block rounded-lg  flex items-center px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                <icon src="hezrwbzv" trigger="loop"></icon>
                开始体验
                <span class="text-gray-400" aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <button v-if="!logined" class="button w-full  text-xl font-bold mt-2" @click="$router.push('/LR')">
              登陆/注册
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class=" rounded-lg hidden lg:inline-block  p-5 w-2/4">
      <div class="flex ">

        <icon src="xfftupfv" trigger="loop" class1="mr-0.5 "></icon>
        <input type="text" @keyup.enter="search" v-model="key"
               class="w-3/4 bg-white pl-2 text-base font-bold outline-0 border-2 border-indigo-600 rounded-bl rounded-tl"
               placeholder='用文字连接世界'/>
        <button @click="search"
                class="bg-indigo-600 cursor-pointer p-2 rounded-tr-lg rounded-br-lg text-white font-bold hover:bg-indigo-500 transition-colors">
          探索世界
        </button>
      </div>
    </div>
  </main>
  <!--  <div class="flex h-screen w-screen items-center justify-center p-5">-->
  <!--    -->
  <!--  </div>-->
  <!--  </div>-->
</template>

<script setup>

import {computed, ref, onMounted} from "vue";
import {useStore} from "vuex";

const store = useStore()
const key = ref('')

function search() {
  //搜索this.key
  window.open('https://cn.bing.com/search?form=MOZTSB&pc=MOZI&q=' + key.value)

}

onMounted(() => {
//   VANTA.FOG({
//     el: "#show",
//     mouseControls: true,
//     touchControls: true,
//     gyroControls: false,
//     minHeight: 200.00,
//     minWidth: 200.00
//   })
//   VANTA.NET({
//     el: "#show",
//     mouseControls: true,
//     touchControls: true,
//     gyroControls: false,
//     minHeight: 200.00,
//     minWidth: 200.00,
//     scale: 1.00,
//     scaleMobile: 1.00,
//     color: '#4f46e5',
//     backgroundColor: '#ffffff'
//   })
})

let logined = ref(computed(() => store.state.user != null))
</script>

<style scoped>

</style>