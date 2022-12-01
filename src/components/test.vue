<template>
  <div class="fixed top-0 w-full text-left">
    <Popover class="bg-white relative">
      <div class="mx-auto max-w-8xl px-4 sm:px-6">
        <div class="flex items-center justify-between border-b-2 border-gray-100 py-1 md:justify-start md:space-x-10">
          <!--大屏logo-->
          <div class="flex justify-start lg:w-0 lg:flex-1">
            <a @click="$router.push('/home/index')">
              <span class="sr-only">LeoBlog</span>
              <img class="h-10 scale-150  w-auto sm:h-10" src="http://49.235.100.240/api/source/images/logo.png"
                   alt=""/>
            </a>
          </div>
          <!--          小屏三横线-->
          <div class="-my-2 -mr-2 md:hidden">
            <PopoverButton
                class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span class="sr-only">Open menu</span>
              <Bars3Icon class="h-6 w-6" aria-hidden="true"/>
            </PopoverButton>
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
            <a @click="$router.push('/home/pictures')" class="text-base font-medium text-gray-500 hover:text-gray-900">图片</a>
            <!--            大屏guanyu-->
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

            <input type="text" v-model="key"
                   class="inline-flex  justify-center rounded-md bg-gray-100  px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                   placeholder="搜索..."/>
          </PopoverGroup>


          <!--          大屏菜单options-->
          <Menu as="div" class="hidden z-10 md:relative md:inline-block text-left ">
            <div>
              <MenuButton
                  class="inline-flex  justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Options
                <ChevronDownIcon
                    class="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                    aria-hidden="true"
                />
                <!--                <img class="h-10" src="http://49.235.100.240/api/source/images/logo.png" alt="  ">-->
              </MenuButton>
            </div>

            <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                  class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }">
                    <button
                        :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
                    >
                      <EditIcon
                          :active="active"
                          class="mr-2 h-5 w-5 text-violet-400"
                          aria-hidden="true"
                      />
                      编辑
                    </button>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button
                        :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
                    >
                      <DuplicateIcon
                          :active="active"
                          class="mr-2 h-5 w-5 text-violet-400"
                          aria-hidden="true"
                      />
                      Duplicate
                    </button>
                  </MenuItem>
                </div>
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }">
                    <button
                        :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
                    >
                      <ArchiveIcon
                          :active="active"
                          class="mr-2 h-5 w-5 text-violet-400"
                          aria-hidden="true"
                      />
                      Archive
                    </button>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button
                        :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
                    >
                      <MoveIcon
                          :active="active"
                          class="mr-2 h-5 w-5 text-violet-400"
                          aria-hidden="true"
                      />
                      Move
                    </button>
                  </MenuItem>
                </div>

                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }">
                    <button
                        :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
                    >
                      <DeleteIcon
                          :active="active"
                          class="mr-2 h-5 w-5 text-violet-400"
                          aria-hidden="true"
                      />
                      Delete
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>


          <!--          大屏右侧登陆注册-->
          <div class="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <a @click="$router.push('/LR')"
               class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">登陆</a>
            <a @click="$router.push('/LR')"
               class="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">注册</a>
          </div>
        </div>
      </div>

      <!--      小屏选项卡-->
      <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95"
                  enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in"
                  leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
        <PopoverPanel focus class="absolute z-10 inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
          <div class="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div class="px-5 pt-5 pb-6">
              <div class="flex items-center justify-between">
                <!--                logo-->
                <div>
                  <img class="h-10  scale-150 w-auto" src="http://49.235.100.240/api/source/images/logo.png"
                       alt="Your Company"/>
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
                </nav>
              </div>
            </div>

            <div class="space-y-6 py-6 px-5">
              <div class="grid grid-cols-2 gap-y-4 gap-x-8">
                <a @click="$router.push('/home/pictures')"
                   class="text-base font-medium text-gray-900 hover:text-gray-700">图片</a>
                <a class="text-base font-medium text-gray-900 hover:text-gray-700"></a>
                <a v-for="item in resources" :key="item.name" @click="item.href($router)"
                   class="text-base font-medium text-gray-900 hover:text-gray-700">{{ item.name }}</a>
              </div>
              <!--              小屏登陆注册-->
              <div>
                <a href="#"
                   class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">注册</a>
                <p class="mt-6 text-center text-base font-medium text-gray-500">
                  已经有账户了?
                  {{ ' ' }}
                  <a href="#" class="text-indigo-600 hover:text-indigo-500">登陆</a>
                </p>
              </div>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
    <banner1></banner1>
    <div class="isolate bg-white flex-col items-start">
<!--      <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">-->
<!--        <svg-->
<!--            class="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"-->
<!--            viewBox="0 0 1155 678" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--          <path fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)" fill-opacity=".3"-->
<!--                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"/>-->
<!--          <defs>-->
<!--            <linearGradient id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533" x1="1155.49" x2="-78.208" y1=".177" y2="474.645"-->
<!--                            gradientUnits="userSpaceOnUse">-->
<!--              <stop stop-color="#9089FC"/>-->
<!--              <stop offset="1" stop-color="#FF80B5"/>-->
<!--            </linearGradient>-->
<!--          </defs>-->
<!--        </svg>-->
<!--      </div>-->

      <main>
        <div class="relative px-6 lg:px-8">
          <div class="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
            <div>
              <div class="hidden sm:mb-8 sm:flex justify-center">
                <div
                    class="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                <span class="text-gray-600">
                  赞助作者搞开发 <a @click="$st('嗯？','success')" class="font-semibold text-indigo-600"><span
                    class="absolute inset-0" aria-hidden="true"/>去扶贫 <span aria-hidden="true">&rarr;</span></a>
                </span>
                </div>
              </div>
              <div class="flex-col justify-center items-center text-center">
                <h1 class="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">用文字连接世界</h1>
                <p class="mt-6 text-lg leading-8 text-gray-600 sm:text-center">少年去游荡，中年想掘藏，老年做和尚。</p>

              </div><div class="mt-8 flex gap-x-4 justify-center">
              <a @click="$router.push('/write/0')"
                 class="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700">
                开始创作
                <span class="text-indigo-200" aria-hidden="true">&rarr;</span>
              </a>
              <a @click="$router.push('/home/index')"
                 class="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                开始体验
                <span class="text-gray-400" aria-hidden="true">&rarr;</span>
              </a>
            </div>
              <div
                  class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                <svg
                    class="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                    viewBox="0 0 1155 678" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)" fill-opacity=".3"
                        d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"/>
                  <defs>
                    <linearGradient id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc" x1="1155.49" x2="-78.208" y1=".177"
                                    y2="474.645" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#9089FC"/>
                      <stop offset="1" stop-color="#FF80B5"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel
} from '@headlessui/vue'
import {ref} from 'vue'
import banner1 from '@/components/banner.vue'
import {
  ArrowPathIcon,
  Bars3Icon,
  BookmarkSquareIcon,
  CalendarIcon,
  ChartBarIcon,
  ChevronUpIcon,
  CursorArrowRaysIcon,
  LifebuoyIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import {ChevronDownIcon} from '@heroicons/vue/20/solid'

const navigation = [


  {name: 'Product', href: '#'},
  {name: 'Features', href: '#'},
  {name: 'Marketplace', href: '#'},
  {name: 'Company', href: '#'},
]

const mobileMenuOpen = ref(false)

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
      $router.push("/articles")
    },
    icon: CursorArrowRaysIcon,
  },
  {name: 'Security', description: "Your customers' data will be safe and secure.", href: '#', icon: ShieldCheckIcon},
  {
    name: 'Integrations',
    description: "Connect with third-party tools that you're already using.",
    href: '#',
    icon: Squares2X2Icon,
  },
  {
    name: 'Automations',
    description: 'Build strategic funnels that will drive your customers to convert',
    href: '#',
    icon: ArrowPathIcon,
  },
]
const callsToAction = [
  {name: 'Watch Demo', href: '#', icon: PlayIcon},
  {name: 'Contact Sales', href: '#', icon: PhoneIcon},
]
const resources = [
  {
    name: 'Help Center',
    description: 'Get all of your questions answered in our forums or contact support.',
    href: '#',
    icon: LifebuoyIcon,
  },
  {
    name: 'Guides',
    description: 'Learn how to maximize our platform to get the most out of it.',
    href: '#',
    icon: BookmarkSquareIcon,
  },
  {
    name: 'Events',
    description: 'See what meet-ups and other events we might be planning near you.',
    href: '#',
    icon: CalendarIcon,
  },
  {name: 'Security', description: 'Understand how we take your privacy seriously.', href: '#', icon: ShieldCheckIcon},
]
const recentPosts = [
  {id: 1, name: 'Boost your conversion rate', href: '#'},
  {id: 2, name: 'How to use search engine optimization to drive traffic to your site', href: '#'},
  {id: 3, name: 'Improve your customer experience', href: '#'},
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
      $router.push("/about/introduce")
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
    icon: PhoneIcon,
  }, {
    name: '隐私政策',
    description: '我们的隐私政策',
    href: function ($router) {
      $router.push("/about/privacy")
    },
    icon: PhoneIcon,
  },


]

</script>