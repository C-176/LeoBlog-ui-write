<template>

<!--  <bar></bar>-->
  <login></login>


</template>

<script>


import bar from "@/components/pub/index-header";
import login from "@/components/pub/login";

export default {
  name: 'LR',

  components: {
    bar,
    login
  },
  data(){
    return {

    }
  },


}


</script>


<style scoped>

body {
  height: 100vh;
  width: 100vw;
  /*设置背景图片*/
  background-repeat: no-repeat;
  background-size: 110% 110%;
}

</style>