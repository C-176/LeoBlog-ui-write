<template>

  <h></h>
  <!--  <shell></shell>-->

  <div class="w-full lg:p-5 p-2 flex justify-center space-x-1  transition duration-300 ease-in-out">
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


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>