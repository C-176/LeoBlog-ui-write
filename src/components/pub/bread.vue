<template>

  <div class="fixed invisible top-2 z-40 left-2 mt-14 max-w-20 max-h-2 ">

    <ol role="list" class="flex items-center gap-1 text-sm text-gray-600">
      <li>
        <a @click="$router.push('/home/index')" class="block flex items-center transition hover:text-gray-700">
          <span class="sr-only"> 首页 </span>

          <icon src="gmzxduhd"></icon>
        </a>
      </li>

      <!--        <li v-for="i in items" :key="i.name">-->
      <li class="block flex items-center">
        <icon src="zmkotitn" size="20"></icon>
      </li>

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