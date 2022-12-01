<template>

  <div class=" flex-col justify-center text-center mx-auto w-full md:w-3/5 md:mt-20  items-center">

    <article-show :article-list="articleList"></article-show>
          <el-pagination
              class="bg-white w-3/5"
              v-model:currentPage="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="pageSizes"
              :small="small"
              :disabled="disabled"
              :background="background"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              :default-current-page="defaultCurrentPage"
              :page-count="pageCount"
              :hide-on-single-page="hideOnSinglePage"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"

          />

  </div>

  <a-back-top/>
</template>

<script>
import articleShow from "@/components/pub/articleShow";

import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/vue/20/solid'

export default {
  name: "articles",
  components: {
    articleShow,
    ChevronLeftIcon,
    ChevronRightIcon
  },
  data() {
    return {
      articleList: [],
      currentPage: 1,
      pageSize: 20,
      pageSizes: [20, 50, 100, 200],
      small: false,
      disabled: false,
      background: false,
      total: 30,
      defaultCurrentPage: 1,
      pageCount: 1,
      hideOnSinglePage: true,

    };
  },
  created() {
    this.getArticlesDefault();

  }, methods: {
    b(name) {
      if (name == 'title') {
        this.getArticlesByKey()
      }
    },
    getArticlesDefault() {
      this.$axios.get('/article/list/' + this.currentPage + '/' + this.pageSize).then((res) => {
        let map = res.data.data
        this.articleList = map.records
        this.articleList.forEach(x => {
          x.author = {
            userNickname: 'admin',
            userProfilePhoto: 'https://gitee.com/zhengyongjie/blog/raw/master/src/assets/img/author.jpg'
          }
        })
        this.total = map.total
        this.pageCount = map.pages
        this.pageSize = map.size
        this.currentPage = map.current
      })
    },
    getArticlesByKey() {
      this.$axios.get('/article/key/' + this.currentPage + '/' + this.pageSize).then((res) => {
        let map = res.data.data
        this.articleList = map.records
        this.total = map.total
        this.pageCount = map.pages
        this.pageSize = map.size
        this.currentPage = map.current
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.getArticlesDefault()


    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getArticlesDefault()
    },
  },

}
</script>
<style scoped>
.wholeDiv {
  margin: 60px 0 20px calc(17.5%);
  /*水平居中*/
  width: 55%;
  float: none;
  background-color: #fff;
  padding-bottom: 10px;
}

.wholeDiv div {
  width: 100%;
}

</style>