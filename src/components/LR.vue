<template>
  <body :style="{backgroundImage:'url('+bgSrc+')'}">
  <bar></bar>
  <login></login>
  <h1>
<!--    LeoBlog<br>-->
    用纯粹的<br>
    文字<br>
    连接<br>
    不纯粹的世界<br>

  </h1>
  </body>
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
      bgSrc:''
    }
  },
  mounted() {
    this.bgSrc = this.baseURL+'/source/images/index/1.jpg'
  }

}


</script>


<style scoped>
h1{
  position: absolute;
  top: 20%;
  left: 70%;
  text-align: right;
  /*transform: translate(-50%,-50%);*/
  font-size: 40px;
  color: rgba(17, 17, 17, 0.68);
  font-weight: 400;
  /*text-shadow: 0 0 10px #000;*/
}
.main {
  position: fixed;
  height: 426px;
  width: 400px;
  border-radius: 10px;
  top: 100px;
  left: 250px;
  text-align: center;
}

body {
  height: 100vh;
  width: 100vw;
  /*设置背景图片*/
  background-repeat: no-repeat;
  background-size: 110% 110%;
}

</style>