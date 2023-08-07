<template>
  <MyCompostion>
    <div ref="show" class="w-full lg:flex p-2 justify-center space-x-2 items-start z-10  "
         @wheel="scrollBottom">

      <div class="w-full min-w-full lg:my-0 relative">
        <article-show :article-list="articleList"></article-show>
        <div
            class="flex bottom-0  w-full z-40 absolute items-center justify-center transition-all duration-500">
          <button class="inline-flex text-center justify-center  w-full items-center p-2
            text-indigo-600 text-sm backdrop-blur-sm cursor-not-allowed" disabled="">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                 viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>

          </button>
        </div>
      </div>
    </div>
    <!--    <template #slider>-->
    <!--      <right-self></right-self>-->
    <!--&lt;!&ndash;      <copy-right></copy-right>&ndash;&gt;-->
    <!--    </template>-->

    <!--  <el-slider-->
    <!--      v-model="value"-->
    <!--      :max="max"-->
    <!--      :format-tooltip="formatTooltip"-->
    <!--      @input="inputSlider"-->
    <!--      style="color: #fff;height:10px;margin-bottom: 10px"-->
    <!--  />-->
  </MyCompostion>
</template>

<script>
import scrollPics from "@/components/pub/scrollPics";
import articleShow from "@/components/pub/articleShow";
import rightSelf from "@/components/pub/rightSelf";
import chat from "@/components/pub/chat";
import BgCover from "@/components/pub/BgCover";
import copyRight from "@/components/pub/copyRight";
import MyCompostion from "@/components/pub/MyCompostion.vue";


export default {
  name: 'index_main',
  components: {
    MyCompostion,
    scrollPics,
    articleShow,
    rightSelf,
    chat,
    BgCover,
    copyRight
  },
  data() {
    return {
      articleList: [],
      currentPage: 0,
      pageSize: 20,
      max: 0,
      value: 0,
      updateTime: new Date().getTime(),

    }
  },

  created() {
    this.queryArticle()

  },
  mounted() {
    window.addEventListener('scroll', this.scrollBottom)
  },
  beforeRouteLeave() {
    window.removeEventListener('scroll', this.scrollBottom)
  },

  methods: {
    queryArticle() {
      this.currentPage++;
      //获取articleList,一次获取20条
      this.$axios.post('/article/list/', {
        pageNo: this.currentPage,
        pageSize: this.pageSize
      }).then((res) => {
        let map = res.data.data
        let articleList = map.records
        articleList.forEach(x => {
          x.author = {
            userNickname: 'admin',
            userProfilePhoto: 'https://gitee.com/zhengyongjie/blog/raw/master/src/assets/img/author.jpg'
          }
        })
        this.articleList = this.articleList.concat(articleList)
        // this.$nextTick(() => {
        //   this.max = document.documentElement.scrollHeight
        //   this.value = document.documentElement.scrollTop || document.body.scrollTop;
        // })
      })
    }
    ,
    //如果滚动条到最底下，加载更多
    scrollBottom() {
      //监听滚动条滚动事件
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let scrollHeight = document.documentElement.scrollHeight;
      let clientHeight = document.documentElement.clientHeight;
      this.max = scrollHeight - clientHeight
      this.value = scrollTop;
      if (scrollTop + clientHeight >= scrollHeight) {
        this.addArticles()
      }

    },
    addArticles() {
      if (new Date().getTime() - this.updateTime > 1000 * 3) {
        this.updateTime = new Date().getTime()
        this.queryArticle()
      }
    }
    ,
    formatTooltip(value) {
      //保留两位小数
      return `${Math.round(value * 100 / this.max)}%`
    }
    ,
    inputSlider(value) {
      this.value = value;
      //将滚动条滚动到指定位置
      // document.documentElement.scrollTop = value
    }
    ,


  },
  watch: {}

}

</script>

<style scoped>
/*.whole {*/
/*  margin-top: 504px;*/
/*}*/

/*::-webkit-scrollbar {*/
/*  display: none;*/
/*}*/

/*:deep(.el-slider__bar) {*/
/*  background: #fff !important;*/
/*}*/

/*:deep(.el-slider) {*/
/*  position: fixed;*/
/*  bottom: 0px;*/
/*  !*margin-top: 20px;*!*/
/*}*/

:deep(.whole) {
  margin-left: calc(14%) !important;
}

/*::-webkit-scrollbar {*/
/*  width: 0 !important;*/
/*}*/

/*::-webkit-scrollbar {*/
/*  width: 0 !important;*/
/*  height: 0;*/
/*}*/

</style>