<template>
  <!-- component -->
  <section class="" >
    <div
        class="w-full h-screen bg-center  bg-black px-4 pt-24 py-8 mx-auto text-left  lg:text-center"
        :style="{backgroundImage:'url(http://49.235.100.240:8080/source/upload/images/c2aaf2de-e0d6-4c90-a42d-bf4c7f34e1ef.png)'}"
    >
      <h1
          class="text-3xl font-extrabold leading-10 tracking-tight text-left text-white text-center sm:leading-none lg:text-6xl text-4xl lg:text-7xl"
      >
        <span class="inline lg:block">加入我们</span>
        <span
            class=" mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-emerald-400 to-green-500 lg:inline-block"
        > 正在<span class="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-cyon-400 to-purple-300">招聘中</span> </span>
      </h1>
      <div
          class="mx-auto rounded-lg font-black mt-5 text-zinc-400 lg:mt-12 lg:max-w-lg text-center lg:text-lg"
      >
        <button class="bg-tkb mx-auto flex items-center justify-center  border text-sm hover:text hover:scale-105 transition duration-300 text-white py-3 px-7 rounded-full" @click="$sa('Σ(っ °Д °;)っ','success')">
          <icon src="tyvtvbcy" trigger="loop"></icon> 加入LeoBlog
        </button>
      </div>
    </div>
  </section>

<!--  <hr class="text-white mx-5" />-->
<!--  <footer class="bg-black pb-5">-->
<!--    <div class="max-w-screen-xl px-4 pt-8 mx-auto sm:px-6 lg:px-8">-->
<!--      <div class="sm:flex sm:items-center sm:justify-between">-->
<!--        <div class="flex justify-center text-teal-300 sm:justify-start">-->
<!--          <img class="rounded-full" src="https://sahilnetic.xyz/evilcat.png" width="40" height="40" />-->
<!--        </div>-->

<!--        <p class="mt-4 text-sm text-center text-gray-400 lg:text-right lg:mt-0">-->
<!--          T&C &nbsp; Career &nbsp; Privacy & Policy &nbsp; Developers-->
<!--        </p>-->
<!--      </div>-->
<!--    </div>-->
<!--  </footer>-->
</template>

<script>
export default {
  name: "join"
}
</script>

<style scoped>

</style>