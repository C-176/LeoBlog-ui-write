<template>
  <div class="top-0 w-full fixed top-0 h-12 z-20 text-left">
    <Popover class="bg-white relative">
      <div class="mx-auto max-w-8xl px-2 sm:px-2">
        <div class="flex items-center justify-between  border-b-2 border-gray-100 py-1 md:justify-start ">
          <!--          小屏三横线-->
          <div class="-my-2 -mr-2 md:hidden">
            <PopoverButton
                class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span class="sr-only">Open menu</span>
              <Bars3Icon class="h-6 w-6" aria-hidden="true"/>
            </PopoverButton>
          </div>
          <!--大屏logo-->
          <div class="flex justify-start hidden md:inline-block lg:w-0 lg:flex-1">
            <div>
              <span class="sr-only">LeoBlog</span>
              <img @click="$router.push('/index')" class="h-10 scale-140 cursor-pointer w-auto sm:h-10"
                   src="http://49.235.100.240/api/source/images/logoTest.png"
                   alt=""/>

            </div>
          </div>

          <Menu as="div" v-if="logined"
                class="md:hidden z-10 space-x-2  inline-flex justify-center items-center text-left ">
            <button type="button" @click="$store.commit('changeMessageVisible',!$store.state.messageVisible)"
                    class="rounded-full  bg-gray-300 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-4 w-4 text-indigo-600" aria-hidden="true"/>
            </button>

            <button type="button" @click="$store.commit('changeChatVisible',!$store.state.chatVisible)"
                    class="rounded-full  bg-gray-300 p-1 text-gray-400 text-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
              <span class="sr-only">View notifications</span>
              <ChatBubbleOvalLeftEllipsisIcon class="h-4 w-4 text-indigo-600" aria-hidden="true"/>
            </button>
            <div class="relative inline-block text-left">
              <div
                  class="flex items-center justify-center p-0.5 cursor-pointer   border-indigo-600 border-2  rounded-full">

                <img :src="user.userProfilePhoto" id="options-menu" @click="openMenu = !openMenu"
                     class="w-8 h-8 rounded-full">
              </div>
              <div v-show="openMenu"
                   class="absolute p-2 right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                <div class="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <a @click="item.href($router)" v-for="item in pages" :key="item.name"
                     class="block block px-4 py-2 cursor-pointer rounded-xl text-md text-gray-700 hover:bg-indigo-600 hover:text-white dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                     role="menuitem">
                <span class="flex flex-col">
                    <span>
                        {{ item.name }}
                    </span>
                </span>
                  </a>

                </div>
              </div>
            </div>
          </Menu>
          <div v-else
               class="flex justify-start inline-block md:hidden lg:w-0 mr-4 lg:flex-1">
            <a @click="$router.push('/index')">
              <span class="sr-only">LeoBlog</span>
              <img class="h-10 scale-140  w-auto sm:h-10" src="http://49.235.100.240/api/source/images/logoTest.png"
                   alt=""/>
            </a>
          </div>
          <!--          大屏中间导航栏-->
          <PopoverGroup as="nav" class="hidden space-x-10 md:flex items-center">
            <!--            大屏文章-->
            <Popover class="relative" v-slot="{ open }">
              <PopoverButton
                  :class="[open ? 'text-gray-900' : 'text-gray-500', ' group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-0 border-none']">
                <span class="text-base">文章</span>
                <ChevronDownIcon
                    v-show="!open"
                    :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']"
                    aria-hidden="true"/>
                <ChevronUpIcon
                    v-show="open"
                    :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']"
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
                      <a v-for="item in solutions" :key="item.name" @click="item.href($router)"
                         class="-m-3 flex items-start rounded-lg p-1 hover:bg-gray-50">
                        <component :is="item.icon" class="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true"/>
                        <div class="ml-4">
                          <p class="text-base font-medium text-gray-900">{{ item.name }}</p>
                          <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
                        </div>
                      </a>
                    </div>
                    <!--                    <div class="space-y-6 bg-gray-50 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">-->
                    <!--                      <div v-for="item in callsToAction" :key="item.name" class="flow-root">-->
                    <!--                        <a :href="item.href" @click="alert('hello')"-->
                    <!--                           class="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-100">-->
                    <!--                          <component :is="item.icon" class="h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true"/>-->
                    <!--                          <span class="ml-3">{{ item.name }}</span>-->
                    <!--                        </a>-->
                    <!--                      </div>-->
                    <!--                    </div>-->
                  </div>
                </PopoverPanel>
              </transition>
            </Popover>
            <!--            大屏中间两个导航栏-->
            <a @click="$router.push('/home/tips')"
               class="text-base font-medium text-gray-500 hover:text-gray-900">纸条</a>
            <!--            大屏关于-->
            <Popover class="relative" v-slot="{ open }">
              <PopoverButton
                  :class="[open ? 'text-gray-900' : 'text-gray-500', ' group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-0 border-none']">
                <span class="text-base">关于</span>
                <ChevronDownIcon
                    v-show="!open"
                    :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']"
                    aria-hidden="true"/>
                <ChevronUpIcon
                    v-show="open"
                    :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']"
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
                      <a v-for="item in about" :key="item.name" @click="item.href($router)"
                         class="-m-3 flex items-start rounded-lg p-1 hover:bg-gray-50">
                        <component :is="item.icon" class="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true"/>
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

            <!--            大屏工具-->
            <Popover class="relative" v-slot="{ open }">
              <PopoverButton
                  :class="[open ? 'text-gray-900' : 'text-gray-500', ' group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-0 border-none']">
                <span class="text-base">工具</span>
                <ChevronDownIcon
                    v-show="!open"
                    :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']"
                    aria-hidden="true"/>
                <ChevronUpIcon
                    v-show="open"
                    :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']"
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
                      <a v-for="item in more" :key="item.name" @click="item.href($router)"
                         class="-m-3 flex items-start rounded-lg p-1 hover:bg-gray-50">
                        <component :is="item.icon" class="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true"/>
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
          <div class="hidden items-center justify-end md:flex md:flex-1 lg:w-0 space-x-2">
            <template v-if="!showPlayer">
              <a-tooltip id="close"  title="音乐">
                <button class="rounded-xl z-20 text-white h-8 w-8 text-center bg-indigo-100 hover:bg-indigo-200"
                        @click="showPlayer=true">
                  🎵
                </button>
              </a-tooltip>
            </template>
            <music v-else :show-player="showPlayer" @closePlayer="() => {showPlayer=false}"></music>
            <template v-if="!logined">
              <a @click="login"
                 class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">登陆</a>
              <a @click="registerAction"
                 class="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">注册</a>
            </template>
            <template v-else>
              <!--            <a @click="$router.push('/back/info')"-->
              <!--               class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">个人中心</a>-->
              <!--            <a @click="logout"-->
              <!--                class="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">退出</a>-->
              <input v-show="logined" type="text" @click="openSearch = !openSearch"
                     class="hidden md:inline-flex   justify-center rounded-md bg-gray-100  px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                     placeholder="Ctrl+K 搜索"/>
              <!--          大屏菜单options-->
              <Menu as="div" v-if="logined"
                    class="z-10 space-x-2  inline-flex justify-center items-center text-left ">

                <button type="button" @click="$store.commit('changeMessageVisible',!$store.state.messageVisible)"
                        class="rounded-full duration-500 hover:bg-gray-300 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                  <span class="sr-only">View notifications</span>
                  <BellIcon class="h-4 w-4 text-indigo-600" aria-hidden="true"/>
                </button>

                <a-badge :count="$store.state.chatPoint">

                  <button type="button" @click="$store.commit('changeChatVisible',!$store.state.chatVisible)"
                          class="rounded-full  duration-500 hover:bg-gray-300 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                    <span class="sr-only">View notifications</span>
                    <!--                  <a-badge :count="$store.state.messagePoint">-->
                    <ChatBubbleOvalLeftEllipsisIcon class="h-4 w-4 text-indigo-600" aria-hidden="true"/>
                    <!--                  </a-badge>-->

                  </button>
                </a-badge>
                <div class="relative inline-block text-left">
                  <div
                      class="flex items-center justify-center p-0.5 cursor-pointer   border-indigo-600 border-2  rounded-full">

                    <img :src="p(user.userProfilePhoto)" id="options-menu" @mouseover="openMenu = true"

                         class="w-8 h-8 rounded-full">
                  </div>
                  <div v-show="openMenu"
                       @mouseover="openMenu = true" @mouseleave="closeMenu"
                       class="absolute transition duration-500 p-2 right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div class="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">

                      <div @click="item.href($router)" v-for="item in pages" :key="item.name"
                           class="block px-4 py-2 cursor-pointer rounded-xl text-md  hover:bg-indigo-600 hover:text-white dark:text-gray-100 dark:hover:text-white "
                           role="menuitem">
                <span class="flex flex-col">
                    <span>
                        {{ item.name }}
                    </span>
                </span>
                      </div>

                    </div>
                  </div>
                </div>
              </Menu>
              <a @click="logOut"
                 class="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">退出</a>


            </template>
          </div>
        </div>
      </div>

      <!--      小屏选项卡-->
      <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95"
                  enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in"
                  leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
        <PopoverPanel focus class="absolute z-50 inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
          <div class="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div class="px-5 pt-5 pb-6">
              <div class="flex items-center justify-between">
                <!--logo-->
                <div>
                  <img @click="$router.push('/index')" class="cursor-pointer h-10 pl-1  scale-140 w-auto"
                       src="http://49.235.100.240/api/source/images/logoTest.png"
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
              <div class="mt-6">
                <nav class="grid gap-y-8">
                  <a v-for="item in solutions" :key="item.name" @click="item.href($router)"
                     class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                    <component :is="item.icon" class="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true"/>
                    <span class="ml-3 text-base font-medium text-gray-900">{{ item.name }}</span>
                  </a>
                  <a v-for="item in navigation" :key="item.name" @click="item.href($router)"
                     class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                    <component :is="item.icon" class="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true"/>
                    <span class="ml-3 text-base font-medium text-gray-900">{{ item.name }}</span>
                  </a>
                </nav>
              </div>
            </div>

            <div class="space-y-6 py-6 px-5">
              <div class="grid grid-cols-2 gap-y-4 gap-x-8">
                <a v-for="item in about" :key="item.name" @click="item.href($router)"
                   class="text-base font-medium text-gray-900 hover:text-gray-700">{{ item.name }}</a>
              </div>
              <!--              小屏登陆注册-->
              <div>
                <template v-if="!logined">
                  <a @click="registerAction"
                     class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">注册</a>
                  <p class="mt-6 text-center text-base font-medium text-gray-500">
                    已经有账户了?
                    {{ ' ' }}
                    <a @click="login" class="text-indigo-600 hover:text-indigo-500">登陆</a>
                  </p></template>
                <template v-else>
                  <a @click="logOut"
                     class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">退出</a>
                </template>

              </div>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>

  </div>

  <chat v-if="logined"></chat>
  <message v-if="logined"></message>
  <BgCover :showCover.sync="$store.state.chatVisible || $store.state.messageVisible || $store.state.bgCover"></BgCover>
  <!--  <search-dialog :is-open="openSearch" ></search-dialog>-->
</template>

<script setup>
import chat from "@/components/pub/chat";
import message from "@/components/pub/message";
import searchDialog from '@/components/pub/searchDialog'
import BgCover from "@/components/pub/BgCover";
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

const router = useRouter()
const openSearch = ref(false)
const showPlayer = ref(true)

function closeMusic() {
  console.log('close ====')
  showPlayer.value = false
}

function login() {
  store.commit('changeLogin', true)
  router.push({path: '/LR'})
}

function registerAction() {
  store.commit('changeLogin', false)
  router.push({path: '/LR'})
}

const store = useStore()
let logined = ref(computed(() => store.state.user != null))
const user = computed(() => store.state.user)

const props = defineProps({
  foo: String
})
const navigation = [
  {name: '纸条', href: '#', icon: ChartBarIcon},
  {name: 'Marketplace', href: '#', icon: ChartBarIcon},
]

function closeMenu() {
  setTimeout(() => {
    openMenu.value = false
  }, 300)

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
      localStorage.removeItem(encode("lb_user"),)
      router.push('/LR')

    }
  })
}

const mobileMenuOpen = ref(false)
const openMenu = ref(false)
const pages = [
  {
    name: '个人中心', href: function ($router) {
      openMenu.value = false
      $router.push('/back/info')
    }
  },
  {
    name: '我的文章', href: function ($router) {
      openMenu.value = false
      $router.push('/back/articles')
    }
  },
  {
    name: '我的草稿', href: function ($router) {
      openMenu.value = false
      $router.push('/back/scripts')
    }
  },
  {
    name: '评论中心', href: function ($router) {
      openMenu.value = false
      $router.push('/back/comments')
    }
  },
  {
    name: '安全中心', href: function ($router) {
      openMenu.value = false
      $router.push('/back/security')
    }
  }
]
const solutions = [
  {
    name: '创作',
    description: '认真对待自己的作品，就是认真对待所有读者、点评者和研究者。',
    href: function ($router) {
      $router.push("/write/0")
    },
    icon: ChartBarIcon,
  },
  {
    name: '阅读',
    description: '阅读似乎有一种无法抗拒的力量。它好似一把万能钥匙，即使是再坚不可摧的心门，只要它轻轻一撬，便会涌进去万丈光芒。',
    href: function ($router) {
      $router.push("/home/article")
    },
    icon: CursorArrowRaysIcon,
  }
]
const callsToAction = [
  {name: 'Watch Demo', href: '#', icon: PlayIcon},
  {name: 'Contact Sales', href: '#', icon: PhoneIcon},
]

const more = [
  {
    name: '代码随想录', href: function ($router) {
      $router.push("/video/programmercarl.com")
    }, description: '本站是一套完整的刷题计划，旨在帮助大家少走弯路，循序渐进学算法。', icon: LifebuoyIcon
  },
  {
    name: '茶杯狐', href: function ($router) {
      $router.push("/video/cupfox.app")
    }, description: '茶杯狐最新地址：cupfox.app 请及时收藏！'
    , icon: ShieldCheckIcon
  },{
    name: 'JavaGuide', href: function ($router) {
      $router.push("/video/javaguide.cn*home.html")
    }, description: '「Java学习+面试指南」一份涵盖大部分 Java 程序员所需要掌握的核心知识。准备 Java 面试，首选 JavaGuide！'
    , icon: ShieldCheckIcon
  },


]

const about = [
  {
    name: '大事记',
    description: '我们的历程',
    href: function ($router) {
      $router.push("/about/bigs")
    },
    icon: ChartBarIcon
  },
  {
    name: '关于我们',
    description: '我们是一个小团队，致力于为大家提供一个优质的创作平台。',
    href: function ($router) {
      $router.push("/about/team")
    },
    icon: Bars3Icon,
  }
  ,
  {
    name: '联系我们',
    description: '如果您有任何问题，欢迎联系我们。',
    href: function ($router) {
      $router.push("/about/contact")
    },
    icon: PhoneIcon,
  },
  {
    name: '加入我们',
    description: '如果您有兴趣加入我们，欢迎联系我们。',
    href: function ($router) {
      $router.push("/about/join")
    },
    icon: LifebuoyIcon,
  }


]

</script>