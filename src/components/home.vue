<template>

  <h></h>
    <shell></shell>

  <router-view class="router-view" v-slot="{ Component }">
<!--    <transition :name="transitionName" mode="out-in">-->
      <keep-alive>
        <component :is="Component" :key="$route.fullPath" v-if="$route.meta.keepAlive"/>
      </keep-alive>
<!--    </transition>-->
        <component :is="Component" :key="$route.fullPath" v-if="!$route.meta.keepAlive"/>
  </router-view>

</template>

<script>
import shell from "@/components/pub/shell";
import h from "@/components/h";
import LR from "@/components/LR";
import index_main from "@/components/front/index_main";


export default {
  name: 'home',
  components: {
    shell,
    h,
    LR,
    index_main,
  },
  data() {
    return {
      routerTime: 0,
      transitionName: "slide-left"
    }
  },
  computed: {
    key() {
      // console.log(this.$route)
      return this.$route.fullPath;
    },
    keepAlive() {
      return this.$route.meta.keepAlive;
    }
  },

}

</script>

<style scoped>
.slide-left-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.slide-left-enter-to {
  transform: translateX(0px);
}

.slide-left-leave-from {
  transform: translateX(0);
}

.slide-left-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s;
}
</style>