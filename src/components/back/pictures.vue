<template>
  <bread>图片</bread>
  <div class="whole" v-loading="$loading">
    <img class="index" v-for="(pic,index) in pics" :style="{backgroundImage:'url('+pic+')'}">
  </div>
  <a-divider orientation="center" style="color: #859c9c">到底了</a-divider>
  <a-back-top/>
</template>

<script>
export default {
  name: "pictures",
  data() {
    return {
      pics: [],
    }
  },
  created() {
    let randomList = this.randomNum(1, 167, 20);
    this.pics = randomList.map((item) => {
      // return this.baseURL + '/source/images/index/' + item + '.jpg'
      return '/source/images/zip/' + item + '.jpg'
    });
    this.$nextTick(() => {
      window.addEventListener('scroll', this.scrollBottom);
    })
  this.$loading = false;
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.scrollBottom)//页面离开后销毁监听事件
  },
  methods: {
    // 监听滚动条
    scrollBottom() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      for (let i = 0; i < document.getElementsByClassName('index').length; i++) {
        document.getElementsByClassName('index')[i].style.backgroundPositionY = scrollTop + 'px'
      }
    },
    //随机产生不重复的5个数
    randomNum(min, max, n) {
      var r = [];
      for (var i = 0; i < n; i++) {
        var flag = true;
        var random = Math.floor(Math.random() * (max - min + 1) + min);
        for (var j = 0; j < r.length; j++) {
          if (random === r[j]) {
            flag = false;
            break;
          }
        }
        if (flag) {
          r.push(random);
        } else {
          i--;
        }
      }
      return r;
    },

  },



}
</script>

<style scoped>

.whole {
  margin-top: 40px;
  height: 100%;
  width: 100%;
}

img {
  width: 100vw;
  /*height: calc(100vh - 50px);*/
  /*background-size: 100% 100%;*/
}
</style>