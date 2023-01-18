<template>

  <div class="relative h-screen overflow-auto bg-white">
<!--    <div class="relative z-10 flex items-center px-6 py-32 mx-auto md:px-12 xl:py-40">-->
      <div class="relative z-10 pt-20 mx-auto flex flex-col items-center w-full">
        <h1 class="mt-4 text-4xl md:text-5xl font-bold leading-tight text-center text-black">
          这里是孤独的荒原
        </h1>
        <span class="p-2 text-gray-600">如果是根据粘贴链接来到此页面的，请检查链接。<br>如果是从本网站其他页面导航至此，请反馈让我们知道。<br>谢谢！</span>
        <p class=" text-black text-4xl md:text-8xl flex items-center my-28 md:my-44 animate-bounce">
<!--          <icon src="kudalook" trigger="loop" size="40"></icon>-->
          🪲 404 Not Fuck
        </p>
        <div class="flex justify-center space-x-2 items-center">
          <button @click="this.$router.go(-1)" class="button font-bold p-5">返回上一页</button>
          <button @click="$router.push('/about/contact')" class="button font-bold p-5">
            联系我们
          </button>
        </div>
      </div>
<!--    </div>-->
  </div>


</template>


<script>
export default {
  name: "404"
}
</script>

<style scoped>

/*.whole {*/
/*  margin-left: calc(22.5%);*/
/*  margin-top: 60px;*/
/*  width: 55%;*/
/*  height: 100%;*/
/*  text-align: left;*/
/*  background-color: #fff;*/
/*  padding: 10px;*/
/*}*/

</style>