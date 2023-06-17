<template>

  <h></h>
  <!--  <shell></shell>-->

  <div class="w-full lg:p-5 p-2 flex justify-center gap-x-1">
    <div class="w-full  mt-14 ">
      <router-view class="router-view" v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="$route.fullPath" v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <component :is="Component" :key="$route.fullPath" v-if="!$route.meta.keepAlive"/>
      </router-view>
    </div>
<!--    <div v-if="$store.state.sliderVisible" class="w-1/4  mt-14 h-screen ">-->
<!--&lt;!&ndash;      <router-view class="router-view" v-slot="{ Component }">&ndash;&gt;-->
<!--&lt;!&ndash;        <keep-alive>&ndash;&gt;-->
<!--&lt;!&ndash;          <component :is="Component" :key="$route.fullPath" v-if="$route.meta.keepAlive"/>&ndash;&gt;-->
<!--&lt;!&ndash;        </keep-alive>&ndash;&gt;-->
<!--&lt;!&ndash;        <component :is="Component" :key="$route.fullPath" v-if="!$route.meta.keepAlive"/>&ndash;&gt;-->
<!--&lt;!&ndash;      </router-view>&ndash;&gt;-->
<!--      <account></account>-->
<!--    </div>-->
  </div>
</template>

<script>
import shell from "@/components/pub/shell";
import h from "@/components/h";
import LR from "@/components/LR";
import index_main from "@/components/front/index_main";
import Account from "@/components/pub/account.vue";


export default {
  name: 'home',
  components: {
    Account,
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