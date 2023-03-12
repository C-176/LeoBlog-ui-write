<template>

  <div class="hidden lg:flex w-full bg-white p-1 rounded-xl">

    <!--      头部滚动图-->
    <div class="flex justify-center items-center  w-full" @mouseleave="leave">
      <transition name="fade">
        <div v-if="show" class="w-4/5 h-full">
          <el-image
              class="rounded-xl h-full"
              :src="mainPic"
              :initial-index="index"
              style="z-index: 1"
              fit="cover"
              :preview-src-list="picUrl"
              hide-on-click-modal
              close-on-press-escape
              ref="image"
          />
        </div>
      </transition>
      <div class="flex-col justify-evenly h-full items-center w-1/6">
        <div v-for="i in [0,1,2,3,4]" class="relative hover:right-10 transform  scale-90 transition-all duration-1000 ease-in-out  hover:scale-120 " @mouseover="over(i)" :class="{dd:isSelected[i]}">
          <img class="rounded-xl" :src="picUrl[i]" alt="pic">
        </div>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'scrollPics',
  data() {
    return {
      hz: 10000,
      show: true,
      loading: true,
      index: 0,
      randomList: [1, 1, 1, 1, 1],
      picUrl: [],
      mainPic: '',
      isSelected: [true, false, false, false, false],
      integral: null,
    }
  },
  watch: {
    // picUrl() {
    //   this.$nextTick(() => {
    //     this.mainPic = this.picUrl[0]
    //     setTimeout(() => {
    //       this.loading = false
    //     }, 3000)
    //     // this.loading = false
    //   })
    // }
  },

  created() {
    this.randomList = this.randomNum(1, 167, 5);
    this.picUrl = this.randomList.map((item) => {
      // return this.baseURL + '/source/images/index/' + item + '.jpg'
      return '/source/images/zip/' + item + '.jpg'
    });
    // 将picUrl中的图片存下来,返回链接数组
    // this.mainPic = ()=> import(this.picUrl[0]);
    this.mainPic = this.picUrl[0];
    // 开始循环
    this.scroll();

  },
  methods: {
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
    scroll() {
      this.integral = setInterval(() => {
        this.show = false
        for (var i = 0; i < 5; i++) {
          if (this.isSelected[i]) {
            let select = i === 4 ? 0 : i + 1;
            this.isSelected[select] = true;
            this.index = select;

            this.isSelected[i] = false;


            this.$nextTick(() => {
              this.mainPic = this.picUrl[select];
              this.show = true
            });
            break;
          }
        }
      }, this.hz)

    },
    over(index) {
      this.show = false
      this.index = index;
      this.$nextTick(() => {
        this.mainPic = this.picUrl[index];
        this.show = true
      });
      // this.mainPic = this.picUrl[index];
      //取消循环
      this.integral = clearInterval(this.integral);
      // clearInterval(this.integral);
      for (var i = 0; i < 5; i++) {
        this.isSelected[i] = i === index;
      }


    },
    leave() {
      if (this.integral == null) {
        this.scroll();
      }

    }
  }
}


</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.dd{
  opacity: 0;
  right: 250px;
}

</style>