<template>
  <transition name="fade">
    <div v-if="showCover" class="fixed w-screen h-screen bg-black bg-opacity-30 z-40 backdrop-blur-sm md:backdrop-blur-sm"></div>
  </transition>
</template>

<script>
export default {
  name: "BgCover",

  props: ["showCover"],
  watch: {
    showCover(newVal) {
      if (newVal) {
        console.log("show");
        //滚动条不可用
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflowX = "hidden";
        document.body.style.overflowY = "auto";


      }
    }
  }
}

</script>


<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .0s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>