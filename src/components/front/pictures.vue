<template>
  <bread>图片</bread>
  <MyCompostion>
    <div class="w-full h-full">
      <img class="pic w-full lg:h-screen h-1/2 bg-cover my-0.5 rounded-xl" src="" v-for="(pic,index) in pics"
           :style="{backgroundImage:'url('+pic+')'}" loading="lazy" alt="">
      <img class="pic w-full lg:hidden  bg-cover " :src="pic" v-for="(pic,index) in pics" loading="lazy" alt="">
    </div>
    <a-divider orientation="center" style="color: #859c9c">到底了</a-divider>
  </MyCompostion>
</template>

<script>
import MyCompostion from "@/components/pub/MyCompostion.vue";

export default {
  name: "pictures",
  components: {MyCompostion},
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
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.scrollBottom)//页面离开后销毁监听事件
  },
  methods: {
    // 监听滚动条
    scrollBottom() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      for (let i = 0; i < document.getElementsByClassName('pic').length; i++) {
        document.getElementsByClassName('pic')[i].style.backgroundPositionY = scrollTop + 'px'
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

</style>