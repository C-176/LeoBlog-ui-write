<template>

  <h></h>
  <shell></shell>

  <router-view v-slot="{ Component }">

    <keep-alive>
      <component :is="Component" :key="$route.fullPath" v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <component :is="Component" :key="$route.fullPath" v-if="!$route.meta.keepAlive"/>

  </router-view>

</template>

<script>
import shell from "@/components/pub/shell";
import h from "@/components/pub/header";
import LR from "@/components/LR";
import index_main from "@/components/front/index_main";

export default {
  name: 'home',
  components: {
    shell,
    h,
    LR,
    index_main
  },
  data() {
    return {}
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

</style>