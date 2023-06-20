<template>
  <transition name="fade">
    <div v-if="showCover"
         @click="quit()"
         class="fixed bg-opacity-10 bg-indigo-300 w-screen h-screen  backdrop-blur-lg z-40 "></div>
  </transition>
</template>

<script>
export default {
  name: "bgCover",

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
  },
  methods:{
    quit(){
      this.$emit("quit")
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