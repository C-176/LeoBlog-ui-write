<template>

  <div class="relative h-screen overflow-hidden bg-white">
    <div class="relative z-10 flex items-center px-6 py-32 mx-auto md:px-12 xl:py-40">
      <div class="relative z-10 flex flex-col items-center w-full">
        <h1 class="mt-4 text-5xl font-bold leading-tight text-center text-black">
          这里是孤独的荒原
        </h1>
        <p class=" text-black text-8xl my-44 animate-bounce">
          🪲404
        </p>
        <div class="flex justify-center space-x-2 items-center">
          <button @click="this.$router.go(-1)" class="button font-bold p-5">返回上一页</button>
          <button @click="$sa('请联系管理员修复虫子\n微信: RTX1999', 'warning')" class="button font-bold p-5">
            联系我们
          </button>
        </div>
      </div>
    </div>
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