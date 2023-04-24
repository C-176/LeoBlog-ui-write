<template>

  <body class="font-poppins invisible lg:visible" v-if="$store.state.shell">
  <div
      id="view"
      class="h-full z-10 fixed inset-0 left-0 w-48 flex items-center"
      x-data="{ sidenav: true }"
  >
    <button
        @click="sidenav = true"
        class="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden"
    >
      <svg
          class="w-5 h-5 fill-current"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
        ></path>
      </svg>
    </button>
    <div
        id="sidebar"
        class="bg-white h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
    >
      <div class="space-y-6 md:space-y-10 mt-20">

        <div id="profile" class="space-y-3">
          <img
              :src=$store.state.user.userProfilePhoto
              alt="Avatar user"
              class="w-10 md:w-16 rounded-full mx-auto"
          />
          <div>
            <h2
                class="font-medium text-xs md:text-sm text-center text-indigo-600"
            >
              {{ $store.state.user.userNickname }}
            </h2>
            <p class="text-xs text-gray-500 text-center">{{ $store.state.user.userCertification }}</p>
          </div>
        </div>
        <div
            class="flex border-2 border-gray-200 rounded-md focus-within:ring-2 ring-indigo-600"
        >
          <input
              type="text"
              class="w-full rounded-xl px-2 py-3 text-sm text-gray-600 focus:outline-none"
              placeholder="Search"
          />
          <button
              class="rounded-tr-md rounded-br-md px-2 py-3 hidden md:block"
          >
            <svg
                class="w-4 h-4 fill-current"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div id="menu" class="flex flex-col space-y-2 text-left">
          <a @click="item.href($router)"
             class="text-xs font-medium text-gray-700 py-2 px-2 transition hover:bg-indigo-500 hover:text-white hover:text-sm rounded-md  "
             v-for="item in pages" :key="item.name">

            <div class="h-full flex items-center space-x-1">
              <icon :src="item.iconSrc"></icon>
              <span class="">{{ item.name }}  </span>
            </div>
          </a>

        </div>
      </div>
    </div>

  </div>
  </body>


</template>

<script>

export default {
  name: 'shell',
  data() {
    return {
      pages: [
        {
          name: '个人中心', href: function ($router) {

            $router.push('/back/info')
          }, iconSrc: 'bhfjfgqz'
        },
        {
          name: '我的文章', href: function ($router) {

            $router.push('/back/articles')
          }, iconSrc: 'vufjamqa'
        },
        {
          name: '我的草稿', href: function ($router) {

            $router.push('/back/scripts')
          }, iconSrc: 'nocovwne'
        },
        {
          name: '评论中心', href: function ($router) {

            $router.push('/back/comments')
          }, iconSrc: 'hpivxauj'
        },
        {
          name: '安全中心', href: function ($router) {

            $router.push('/back/security')
          }, iconSrc: 'huwchbks'
        }
      ]
    }
  }
}

</script>

<style scoped>

</style>