<template v-if="index">
  <body >
  <bar></bar>

  <div class="container">
    <div class="iron-man">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <img alt="" src="/source/images/iron_man.png">
    </div>
    <div class="lines">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="loading-text">灭霸你给我等着，等我登陆了就来收拾你</div>
  </div>

  <div class="word">So，Sign in or Sign up ?</div>
  <div class="login"><a @click="changeIndex(false); changeLogin(true)">
    <router-link to="/LR">登陆</router-link>
  </a></div>
  <div class="register"><a @click="changeIndex(false); changeLogin(false)">
    <router-link to="/LR">注册</router-link>
  </a></div>


  </body>
</template>

<script>
import bar from "@/components/pub/index-header";
import {mapMutations, mapState} from "vuex";

export default {
  name: 'index',
  components: {
    bar,
  },
  computed: {
    ...mapState(['index', 'login'])

  },
  methods: {
    ...mapMutations(['changeIndex', 'changeLogin']),

  },
  data() {
    return {}
  }
}

</script>

<style scoped>
body {
  /*背景图片*/
  background-size: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100vh;
  position: relative;
  overflow: hidden;



}


.header > span {
  display: block;
  float: left;
  width: 40px;
  height: 50px;
  color: #134857;
  margin-left: calc(50% - 90px);
  font-size: 25px;
  text-align: center;
  /* margin-right: 20px; */
  transition: width 1s;
}

.word {
  width: 500px;
  height: 80px;
  line-height: 80px;
  font-size: 40px;
  color: #134857;
  font-weight: bold;

  z-index: 2;
  margin: 0 auto;
  top: 160px;
  right: calc(50% - 250px);
  position: fixed;
}

.login, .register {
  position: absolute;
  height: 55px;
  top: calc(50% - 0px);
  width: 110px;
  font-size: 25px;
  line-height: 55px;
  z-index: 2;
  border-radius: 5px;
}

.login a, .register a {
  display: block;
  height: 100%;
  width: 100%;
  text-decoration: none;
  color: #134857;

}
.login a:hover,.register a:hover{
  color: #87b5c3 !important;
}

.login:hover, .register:hover {
  text-decoration: none;

  background-color: #13485729;
  transition: all 0.5s;
  box-shadow: 1px 3px 3px #13485729;

}

.login {
  right: calc(50% - -420px);
}

.register {
  right: calc(50% - 460px);
}
</style>