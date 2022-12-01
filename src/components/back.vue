<template>
<!--<h></h>-->
  <shell></shell>
  <router-view></router-view>
</template>

<script>
import h from "@/components/pub/header";
import shell from "@/components/pub/shell";
export default{
  name:'articleShow',
  props:['articleList'],
  components:{
    h,
    shell
  },
  data(){
    return{
      // articleList:[]
    }
  }


  }



</script>

<style scoped>

</style>