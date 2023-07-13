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

      <div class="flex-col justify-center overflow-y-scroll  items-center  space-y-2">
        <div class=" flex justify-start float-left w-2/3 ls ys abe">
          <div class="uk border-2 border-gray-200 rounded-full">
            <img class="lq nc re adn "
                 :src="this.$logo"
                 alt=""></div>
          <div class="tl uh">
              <div class="w-auto p-2 text-left adb ado bbi bbo bbs bca bgu bgz">
                <span>你好！有什么问题我可以帮你解答吗？</span>

          </div>
        </div>
        </div>
        <div class=" flex justify-end float-right w-2/3 ls ys abe">

          <div class="tl uh">
              <div class="p-2 text-left max-w-full adb ado bbi bbo bbs bca bgu bgz"><span>使用正则进行拦截器的放行为什么不生效</span>
              </div>
          </div>
          <div class="uk"><img class="lq nc re adn"
                               :src="this.$default_avator"
                               alt="">
          </div>
        </div>
        <div class=" flex justify-start float-left w-2/3 ls ys abe">
          <div class="uk border-2 border-gray-200 rounded-full">
            <img class="lq nc re adn "
                 :src="this.$logo"
                 alt=""></div>
          <div class="tl uh">
            <div class="p-2 text-left adb ado bbi bbo bbs bca bgu bgz">
              <span>使用正则表达式进行拦截器的放行需要注意几个问题：

正则表达式的语法是否正确。如果正则表达式的语法有误，匹配请求路径时会失败，拦截器也会正常执行。

拦截器的顺序是否正确。如果有多个拦截器，需要确保放行规则所在的拦截器在其他拦截器之前执行，否则放行规则可能会被后续的拦截器覆盖。

放行规则是否正确。如果放行规则中使用了正则表达式，需要确保正则表达式能够正确地匹配请求路径。此外，还需要确保放行规则中所使用的字符串符合实际情况，比如是否包含了上下文路径、是否使用了 URL 编码等。</span>

            </div>
          </div>
        </div>
        <div class=" flex justify-end float-right w-2/3 ls ys abe">

          <div class="tl uh">
            <div class="p-2 text-left max-w-full adb ado bbi bbo bbs bca bgu bgz"><span>excludePathPatterns 中添加放行路径的规则是什么</span>
            </div>
          </div>
          <div class="uk"><img class="lq nc re adn"
                               :src="this.$default_avator"
                               alt="">
          </div>
        </div>
        <div class=" flex justify-start float-left w-2/3 ls ys abe">
          <div class="uk border-2 border-gray-200 rounded-full">
            <img class="lq nc re adn "
                 :src="this.$logo"
                 alt=""></div>
          <div class="tl uh">
            <div class="p-2 text-left adb ado bbi bbo bbs bca bgu bgz">
              <span>excludePathPatterns 是 Spring MVC 中的一个配置项，用于指定一些请求路径，这些请求路径将不会被拦截器拦截，直接放行。在 WebMvcConfigurer 接口中，可以通过 addInterceptors 方法来添加拦截器，并通过 excludePathPatterns 方法来指定放行路径。

excludePathPatterns 方法接受一个或多个 Ant 样式路径表达式，用于匹配需要放行的请求路径。Ant 样式路径表达式是一种通配符，用于匹配多个路径。其中，* 表示匹配任意数量的字符，** 表示匹配任意数量的路径，? 表示匹配任意一个字符，{} 表示匹配一组选择项。

以下是一些示例，展示了如何使用 Ant 样式路径表达式来配置 excludePathPatterns：

excludePathPatterns("/api/user/**") 表示放行以 /api/user/ 开头的任意请求路径，包括 "/api/user/123"、"/api/user/login"、"/api/user/info/123" 等。

excludePathPatterns("/api/user/{id}") 表示放行形如 /api/user/{id} 的请求路径，其中 {id} 表示一个变量，可以匹配任意字符串。

excludePathPatterns("/api/user/{id:[0-9]+}") 表示放行形如 /api/user/{id} 的请求路径，其中 {id:[0-9]+} 表示一个变量，只能匹配数字。

需要注意的是，excludePathPatterns 中添加的放行路径规则是从上到下依次匹配的，只要请求路径匹配其中任意一个规则，就会被放行。因此，如果有多个放行规则，需要按照优先级从高到低依次添加，确保优先匹配到较高优先级的规则。</span>

            </div>
          </div>
        </div>



        <!--        <icon src="xfftupfv" trigger="loop" class1="mr-0.5 "></icon>-->
        <!--        <input  @keyup.enter="search" v-model="key"-->
        <!--               class="w-3/4 bg-white pl-2 text-base font-bold outline-0 border-2 border-indigo-600 rounded-bl rounded-tl"-->
        <!--               placeholder='用文字连接世界'/>-->
        <!--        <button @click="search"-->
        <!--                class="bg-indigo-600 cursor-pointer p-2 rounded-tr-lg rounded-br-lg text-white font-bold hover:bg-indigo-500 transition-colors">-->
        <!--          探索世界-->
        <!--        </button>-->
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