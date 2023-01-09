<template>

  <div class="fixed top-2 z-40 left-2 mt-14 max-w-20 max-h-2 ">

    <ol role="list" class="flex items-center gap-1 text-sm text-gray-600">
      <li>
        <a @click="$router.push('/home/index')" class="block transition hover:text-gray-700">
          <span class="sr-only"> 首页 </span>

          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </a>
      </li>

      <!--        <li v-for="i in items" :key="i.name">-->
      <li>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
          <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
          />
        </svg>
      </li>

      <!--        <li>-->
      <!--          <a @click="i.href($router)" class="block transition hover:text-gray-700"> {{i.name}} </a>-->
      <!--        </li>-->

      <li>
        <a class="block transition hover:text-gray-700">
          <slot></slot>
        </a>
      </li>


    </ol>


  </div>
</template>

<script>
export default {
  name: "bread",
  props: ['items']
}
</script>

<style scoped>
/*:deep(.el-breadcrumb__inner.is-link:hover) {*/
/*  color: #111 !important;*/
/*}*/
</style>