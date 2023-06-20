<template>
  <MyCompostion >
    <div ref="show" class="w-full lg:flex p-2 justify-center space-x-2 items-start z-10  " @wheel="scrollBottom">

      <div class="w-full min-w-full lg:my-0 ">
        <article-show :article-list="articleList"></article-show>
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
    // 获取指定元素
    // const scrollview = this.$refs.show
    // 添加滚动监听，该滚动监听了拖拽滚动条
    // 尾部的 true 最好加上，我这边测试没加 true ，拖拽滚动条无法监听到滚动，加上则可以监听到拖拽滚动条滚动回调
    // scrollview.addEventListener('scroll', this.scrollBottom, true)
    window.addEventListener('scroll', this.scrollBottom)
  },
  beforeRouteLeave() {

    // 获取指定元素
    // const scrollview = this.$refs.show
    // 移除滚动监听
    // scrollview.removeEventListener('scroll', this.scrollBottom, true)
    window.removeEventListener('scroll', this.scrollBottom)
  },

  methods: {
    queryArticle() {
      this.currentPage++;
      //获取articleList,一次获取20条
      this.$axios.get('/article/list/' + this.currentPage + '/' + this.pageSize).then((res) => {
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
        if (new Date().getTime() - this.updateTime > 1000 * 10) {
          this.updateTime = new Date().getTime()
          this.queryArticle()
        }
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