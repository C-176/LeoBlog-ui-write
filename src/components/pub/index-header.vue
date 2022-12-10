<template>
  <div class="w-full h-12 px-6  flex  justify-center items-center bg-white border-b-2 border-gray-100 relative">

    <img id="logo" class="h-full w-12 mx-auto " @click="$router.push('/index')"  :src="logoSrc" alt="">
    <a class="block h-full py-2  w-20 p-2 bg-indigo-600 text-white text-base" @click="update">{{ login ? "注册" : "登陆" }}</a>

  </div>

</template>

<script>

import {mapMutations, mapState} from "vuex";

export default {
  name: 'bar',

  data() {
    return {
      logoSrc:'',
      mode: 0,
    }
  },
  computed: {
    ...mapState({
      index: state => state.index,
      login: state => state.login,
    }),

  },
  methods: {
    ...mapMutations['changeLogin', 'changeIndex'],
    //修改props中login的值
    update() {
      this.$store.commit('changeLogin', !this.login);
      this.$st(this.login ? "登陆状态" : "注册状态", 'success')
    }


  },
  created() {
    this.logoSrc = this.baseURL+'/source/images/logo.png'
  }
}
</script>

<style scoped>

.logo {
  width: 120px;
  height: 60px;
  /*margin-left: 35px;*/
  float: left;
  /*margin:0 20px;*/
  /*color: #132c33;*/
  /*font-size: 35px;*/
  transition: width 0.5s;
  /*line-height: 50px;*/
  margin-left:calc(50% - 60px);
}

#logo {
  width: 100%;
  height: 100%;
  border-width: 0;
  margin-top: -10px;

}

.header {
  position: fixed;
  top: 0;
  width: 100%;
  margin: 0 auto;
  height: 50px;
  /*background: #f7f7f9;*/
  background: transparent;
  line-height: 50px;
  color: #d8e3e7;
  /*border-bottom: 1px solid #8fa5a5;*/
  font-weight: 600;
  z-index: 100;
}

.header #cyber {
  float: left;

  color: #134857;
  height: 50px;
  width: 140px;
  text-align: center;
  font-size: 25px;
  margin: 0 auto;
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

.login {
  float: right;
  height: 30px;
  top: 0;
  width: 50px;
  font-size: 16px;
  line-height: 30px;
  border-radius: 5px;
  margin: 10px 20px 0 0;
  background-color: rgba(34, 143, 174, 0.16);
}

.login a {
  display: block;
  height: 100%;
  width: 100%;
  text-decoration: none;

}

.login:hover {
  font-weight: 600;
  text-decoration: none;
  transition: all 0.5s;
  box-shadow: 1px 3px 3px #13485729;
}


</style>