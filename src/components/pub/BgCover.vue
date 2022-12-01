<template>
  <transition name="fade">
    <div v-if="showCover" class="bg-cover"></div>
  </transition>
</template>

<script>
export default {
  name: "BgCover",

  props: ["showCover"],
  watch: {
    showCover(newVal) {
      if (newVal) {
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

.bg-cover {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #1E2427BE;
  z-index: 101;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .0s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>