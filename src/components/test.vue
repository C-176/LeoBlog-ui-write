<template>
  <main id="content" role="main" class="w-full max-w-md mx-auto p-6">
    <div class="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">忘记密码?</h1>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            又想起来了?
            <a class="text-blue-600 decoration-2 hover:underline font-medium" @click="openWindow">
              去登陆
            </a>
          </p>
        </div>

        <div class="mt-5">
          <form>
            <div class="grid gap-y-4">
              <div>
                <label for="email" class="block text-sm font-bold ml-1 mb-2 dark:text-white">邮箱</label>
                <div class="relative">
                  <input type="email" id="email" name="email" class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-indigo-600 focus:ring-indigo-600 shadow-sm" required aria-describedby="email-error">
                </div>
                <p class="hidden text-xs text-red-600 mt-2" id="email-error">请输入有效邮箱</p>
              </div>
              <button type="submit" class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">重置密码</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <p class="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
      <a class="pr-3.5 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-indigo-600 dark:text-gray-500 dark:hover:text-gray-200" href="#" target="_blank">
        <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
        View Github
      </a>
      <a class="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-indigo-600 dark:text-gray-500 dark:hover:text-gray-200" href="#">

        联系我们
      </a>
    </p>
  </main>
</template>

<script setup>

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