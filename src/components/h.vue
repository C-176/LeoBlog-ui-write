<template>
  <div ref="h" class="w-full fixed inset-0 h-12 z-20 text-left">
    <Popover class="bg-white relative">

      <div class="mx-auto max-w-8xl px-2 sm:px-2">
        <div class="flex items-center justify-between  border-b-2 border-gray-100 py-1 lg:justify-start ">
          <!--          小屏三横线-->
          <div class="-my-2 -mr-2 lg:hidden">
            <PopoverButton
                class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span class="sr-only">Open menu</span>
              <Bars3Icon class="h-6 w-6" aria-hidden="true"/>
            </PopoverButton>
          </div>
          <!--大屏logo-->
          <div class=" justify-start hidden lg:inline-block h-full lg:w-0 lg:flex-1 ">

            <span class="sr-only">LeoBlog</span>
            <img @click="$router.push('/index')"
                 class="h-full scale-140 transition duration-500 cursor-pointer w-auto sm:h-10"
                 :src="app.config.globalProperties.baseURL+'/source/images/logoTest.png'"
                 alt=""/>


          </div>


          <!--          <div-->
          <!--               class="flex justify-around space-x-1 inline-block lg:hidden lg:w-0 mr-4 lg:flex-1">-->

          <!--            <a @click="$router.push('/index')">-->
          <!--              <span class="sr-only">LeoBlog</span>-->
          <!--              <img class="h-10 scale-140  w-auto sm:h-10" src="http://49.235.100.240/api/source/images/logoTest.png"-->
          <!--                   alt=""/>-->
          <!--            </a>-->
          <!--            &lt;!&ndash;            <button @click="openSearch = !openSearch"&ndash;&gt;-->
          <!--            &lt;!&ndash;                    class="inline-flex items-center justify-center rounded-md bg-gray-100 align-center p-2 text-xs font-medium text-gray-500 hover:bg-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"&ndash;&gt;-->
          <!--            &lt;!&ndash;            >Ctrl+K 搜索&ndash;&gt;-->
          <!--            &lt;!&ndash;            </button>&ndash;&gt;-->
          <!--          </div>-->
          <!--          大屏中间导航栏-->
          <PopoverGroup as="nav" class="hidden space-x-10 lg:flex items-center">
            <Popover class="relative" v-slot="{ open }" v-for="nav in navList">
              <PopoverButton
                  :class="[open ? 'text-gray-900' : 'text-gray-500', ' group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-0 border-none']">
                <span class="text-base">{{ nav.name }}</span>
                <ChevronDownIcon
                    :class="[open ? 'text-gray-600  rotate-180 ' : 'text-gray-400', 'transform duration-500 ml-2 h-5 w-5 group-hover:text-gray-500']"
                    aria-hidden="true"/>
              </PopoverButton>

              <transition enter-active-class="transition ease-out duration-200"
                          enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0"
                          leave-active-class="transition ease-in duration-150"
                          leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
                <PopoverPanel
                    class="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                  <div class="overflow-hidden rounded-lg shadow-lg ring-0 ring-black ring-opacity-5">
                    <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                      <a v-for="item in nav.list" :key="item.name" @click="item.href($router)"
                         class="-m-3 flex items-start rounded-lg p-1 hover:bg-gray-50">
                        <icon :src="item.iconSrc" trigger="loop"></icon>
                        <div class="ml-4">
                          <p class="text-base font-medium text-gray-900">{{ item.name }}</p>
                          <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
                        </div>
                      </a>
                    </div>

                  </div>
                </PopoverPanel>
              </transition>
            </Popover>
          </PopoverGroup>
          <!--          大屏右侧登陆注册-->
          <div class=" items-center justify-end flex flex-1 w-0 space-x-2 z-20">

            <a-tooltip id="close" title="音乐">
              <button class="rounded-xl  text-white h-8 w-8 text-center "
                      @click="openMusic">
                <icon src="wayquqmn"></icon>
              </button>
            </a-tooltip>
            <button @click="openSearch = !openSearch"
                    class="inline-flex   justify-center rounded-md bg-gray-100  px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >Ctrl+K 搜索
            </button>


            <template v-if="!logined">
              <a @click="registerAction"
                 class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">注册</a>
              <a @click="login"
                 class="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">登陆</a>
            </template>
            <template v-else>


              <!--          options-->
              <Menu as="div" v-if="logined"
                    class="z-20 space-x-2  inline-flex justify-center items-center text-left ">

                <div class="js lv avv cpv" data-headlessui-state="open">
                  <button type="button" @click="$store.commit('changeMessageVisible',!$store.state.messageVisible)"
                          class=" bpw fn ls yu aql ">
                    <icon src="psnhyobz" size="22"></icon>
                  </button>
                  <div :class="{
                        '-translate-y-full invisible': !open,
                        'translate-0 ': open
                      }"
                       class="duration-500 py-2 translate ease-in-out  bg-white transition aa aj dm ll bbg cen cqq cqr crf ctf cuf cwk daw dfx dfy dga "
                       id="headlessui-popover-panel-15" tabindex="-1" data-headlessui-state="open">
                    <message></message>
                  </div>
                </div>

                <!--                <a-badge :count="$store.state.chatPoint">-->

                <button type="button" @click="$store.commit('changeChatVisible',!$store.state.chatVisible)"
                        class="rounded-full relative duration-500  p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                  <icon src="mjmrmyzg"></icon>
                  <span
                      class="absolute bg-red-500 w-3 h-3 transform -translate-x-1/4
                       border-2 border-white rounded-full left-1/2 -top-0"
                      :class="{'hidden':$store.state.chatPoint == 0}"/>

                </button>

                <!--                </a-badge>-->
                <div class="relative inline-block text-left">
                  <div
                      class="flex items-center justify-center p-0.5 cursor-pointer   border-indigo-600 border-2  rounded-full">

                    <img :src="p(user.userProfilePhoto)" id="options-menu"
                         @click="openMenu = !openMenu"
                         class="w-8 h-8 rounded-full">
                  </div>
                  <!--                  @mouseover="openMenuItem = true" @mouseleave="closeMenuItem"-->
                  <div
                      :class="{

                    'translate-y-0 opacity-100': openMenu,
                    '-translate-y-full invisible': !openMenu
                       }"


                      class="absolute ease-in-out transition duration-500 p-2 right-0 w-56 mt-2 origin-top-right
                       bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div class="py-1  transition duration-500 " role="menu" aria-orientation="vertical"
                         aria-labelledby="options-menu">

                      <div
                          class="block text-gray-600  text-center px-4 py-0 transition duration-100 rounded-xl text-sm   "
                      >
                        {{ $store.state.user.userNickname }}
                      </div>
                      <hr>
                      <div class="gs ">
                        <nav class="ls uh ym" aria-label="Sidebar">
                          <ul role="list" class="fv abj">
                            <li>
                              <div @click="goto(item,$router)" v-for="item in pages" :key="item.name"
                                   class="cursor-pointer axo blb bic bpw ls aaa adp aql ath avv awk awb">{{ item.name }}
                              </div>
                            </li>
                          </ul>
                        </nav>
                      </div>

                    </div>
                  </div>
                </div>
              </Menu>
              <a @click="logOut"
                 class="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                退出
              </a>


            </template>
          </div>


        </div>
      </div>

      <!--      小屏选项卡-->
      <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95"
                  enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in"
                  leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
        <PopoverPanel focus
                      class="absolute z-50 max-w-xl inset-x-0 top-0 origin-top-right transform p-2 transition lg:hidden">
          <div

              class="divide-y-2 divide-gray-50  rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5  overflow-y-scroll overflow-x-hidden">
            <div class="px-5 pt-5 pb-6">
              <div class="flex items-center justify-between">
                <!--logo-->
                <div>
                  <img @click="$router.push('/index')" class="cursor-pointer h-10 pl-1 animate-bounce scale-140 w-auto"
                       :src="app.config.globalProperties.baseURL+'/source/images/logoTest.png'"
                       alt="LeoBlog"/>
                </div>
                <!--                小屏关闭选项卡按钮-->
                <div class="-mr-2">
                  <PopoverButton
                      class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span class="sr-only">Close menu</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true"/>
                  </PopoverButton>
                </div>
              </div>
              <!--              小屏导航栏-->
              <div class="mt-2">
                <nav class="grid gap-y-2">
                  <template v-for="nav in navList">
                    <hr>
                    <div class="grid grid-cols-2 gap-y-2 gap-x-8">
                      <a v-for="item in nav.list" :key="item.name" @click="goto(item,$router)"
                         class="flex items-center space-x-2 text-sm text-center font-medium text-gray-900 p-1 rounded-xl hover:bg-gray-100">
                        <icon trigger="loop" :src="item.iconSrc"></icon>
                        <span class="text-gray-900">{{ item.name }}</span>
                      </a>
                    </div>
                  </template>
                </nav>
              </div>
            </div>

            <div class="space-y-3 py-3 px-3">

              <!--              小屏登陆注册-->
              <div>
                <template v-if="!logined">
                  <a @click="login"
                     class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">登陆</a>
                  <p class="mt-6 text-center text-base font-medium text-gray-500">
                    还没有账户?
                    {{ ' ' }}
                    <a @click="registerAction" class="text-indigo-600 hover:text-indigo-500">注册</a>
                  </p></template>
                <template v-else>
                  <a @click="logOut"
                     class="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">退出</a>
                </template>

              </div>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>

  </div>
  <music/>
  <chat v-if="logined"></chat>
  <!--  <message v-if="logined"></message>-->
  <userProfile/>
  <bgCover
      @quit="quit($store)"
      :showCover="$store.state.chatVisible  || $store.state.bgCover || $store.state.musicVisible || openSearch"
  />
  <search-dialog :is-open="openSearch" @closeSearch="() => {openSearch=false}"></search-dialog>


</template>

<script setup>
import chat from "@/components/pub/chat";
import message from "@/components/pub/message";
import searchDialog from '@/components/pub/searchDialog'
import bgCover from "@/components/pub/bgCover";
import userProfile from "@/components/pub/userProfile";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel
} from '@headlessui/vue'
import {computed, ref} from 'vue'
import {
  Bars3Icon,
  BellIcon,
  BookmarkSquareIcon,
  CalendarIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ChevronUpIcon,
  CursorArrowRaysIcon,
  LifebuoyIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import {ChevronDownIcon} from '@heroicons/vue/20/solid'
import {useStore} from 'vuex'
import Swal from "sweetalert2";
import {encode} from '@/util/AES'
import {useRouter} from 'vue-router'
import SearchDialog from "@/components/pub/searchDialog";
import music from "@/components/pub/music";
import Message from "@/components/pub/message.vue";
import app from "@/main";
import axios from "axios";

const router = useRouter()
let openSearch = ref(false)


function quit($store) {

  if ($store.state.chatVisible) {
    $store.commit('changeChatVisible', false)
  }
  if ($store.state.messageVisible) {
    $store.commit('changeMessageVisible', false)
  }
  if ($store.state.bgCover) {
    $store.commit('changeBgCover', false)
  }
  if ($store.state.musicVisible) {
    $store.commit('changeMusicVisible', false)
  }
  if (openSearch) {
    openSearch.value = false
  }

}

function openMusic() {
  store.commit('changeMusicVisible', true)
}

function login() {
  store.commit('changeLogin', true)
  router.push({path: '/LR'})
}

function registerAction() {
  store.commit('changeLogin', false)
  router.push({path: '/LR'})
}

function goto(item, $router) {
  openMenu.value = false
  item.href($router);
  // // 模拟按下esc键
  //
  // setTimeout(() => {
  //   var e = new KeyboardEvent('keydown', {'keyCode': 27, 'which': 27});
  //   document.dispatchEvent(e);
  //
  // }, 500)

}

const store = useStore()
let logined = ref(computed(() => store.state.user != null))
const user = computed(() => store.state.user)

const props = defineProps({
  foo: String
})

function closeMenu() {
  setTimeout(() => {
    if (!openMenuItem.value) {
      openMenu.value = false
    }

  }, 500)

}

function closeMenuItem() {
  setTimeout(() => {
    openMenu.value = false
    openMenuItem.value = false

  }, 500)

}

function logOut() {

  //选择框
  Swal.fire({
    title: '确定退出吗?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  }).then((result) => {
    if (result.value) {
      // this.$store.commit('removeToken')
      // localStorage.removeItem(encode("lb_user"))
      // localStorage.removeItem(encode("lb_userName"))
      // localStorage.removeItem(encode("lb_userPassword"))

      axios.interceptors.request.use(config => {
        const token = localStorage.getItem('token')
        if (token) config.headers['Authorization'] = token
        return config
      })

      axios.get("/user/logout");
      setTimeout(() => {
        store.commit('setUser', null)
      }, 500)
      router.push('/LR')
    }
  })
}

const mobileMenuOpen = ref(false)
let openMenu = ref(false)
let openMenuItem = ref(false)


const pages = [
  {
    name: '个人中心', href: function ($router) {
      openMenu.value = false
      $router.push('/back/info')
    }, iconSrc: 'bhfjfgqz'
  },
  {
    name: '我的文章', href: function ($router) {
      openMenu.value = false
      $router.push('/back/articles')
    }, iconSrc: 'vufjamqa'
  },
  {
    name: '我的草稿', href: function ($router) {
      openMenu.value = false
      $router.push('/back/scripts')
    }, iconSrc: 'nocovwne'
  },
  {
    name: '评论中心', href: function ($router) {
      openMenu.value = false
      $router.push('/back/comments')
    }, iconSrc: 'hpivxauj'
  },
  {
    name: '安全中心', href: function ($router) {
      openMenu.value = false
      $router.push('/back/security')
    }, iconSrc: 'huwchbks'
  }
]
const article = [
  {
    name: '创作',
    description: '认真对待自己的作品，就是认真对待所有读者、点评者和研究者。',
    href: function ($router) {
      $router.push("/write/0")
    }, iconSrc: 'puvaffet'
  },
  {
    name: '阅读',
    description: '阅读似乎有一种无法抗拒的力量。',
    href: function ($router) {
      $router.push("/home/article")
    }, iconSrc: 'wxnxiano'
  }, {
    name: '图片',
    description: '好照片是技术和艺术的成功合成。',
    href: function ($router) {
      $router.push("/home/picture")
    }, iconSrc: 'fgkmrslx'
  }, {
    name: '纸条',
    description: '小的随手片段。',
    href: function ($router) {
      $router.push("/home/tips")
    }, iconSrc: 'fwsfwdlg'
  }
]


const tools = [
  {
    name: '代码随想录', href: function ($router) {
      $router.push("/video/programmercarl.com")
    }, description: '本站是一套完整的刷题计划，旨在帮助大家少走弯路，循序渐进学算法。', iconSrc: 'kkwzhxjj'
  },
  {
    name: '茶杯狐', href: function ($router) {
      $router.push("/video/cupfox.app")
    }, description: '茶杯狐最新地址：cupfox.app 请及时收藏！'
    , iconSrc: 'smeqxwcv'
  }, {
    name: 'JavaGuide', href: function ($router) {
      $router.push("/video/javaguide.cn*home.html")
    }, description: '「Java学习+面试指南」一份涵盖大部分 Java 程序员所需要掌握的核心知识。'
    , iconSrc: 'nobciafz'
  },


]

const goods = [
  {
    name: '徽章', href: function ($router) {
      $router.push("/badgeShow")
    }, description: '使用积分可以进行徽章的购买，徽章会在主页显示。'
    , iconSrc: 'kwnsphnf'
  },


]

const about = [
  {
    name: '大事记',
    description: '我们的历程',
    href: function ($router) {
      $router.push("/about/bigs")
    }, iconSrc: 'krmfspeu'
  },
  {
    name: '关于我们',
    description: '我们是一个小团队，致力于为大家提供一个优质的创作平台。',
    href: function ($router) {
      $router.push("/about/team")
    }, iconSrc: 'jvucoldz'
  }
  ,
  {
    name: '联系我们',
    description: '如果您有任何问题，欢迎联系我们。',
    href: function ($router) {
      $router.push("/about/contact")
    }, iconSrc: 'rhvddzym'
  },
  {
    name: '加入我们',
    description: '如果您有兴趣加入我们，欢迎联系我们。',
    href: function ($router) {
      $router.push("/about/join")
    }, iconSrc: 'uukerzzv'
  }


]
const navList = ref([{name: '文章', list: article},
  {name: '关于', list: about},
  {name: '工具', list: tools},
  {name: '商城', list: goods}])

// 一个计算属性 ref
const open = computed(() => {
  return store.state.messageVisible
})

</script>