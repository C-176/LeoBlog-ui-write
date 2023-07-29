<template>

  <MyCompostion slider="true">
      <article-show :article-list="articleList"></article-show>
      <el-pagination
          class="bg-white w-full flex justify-center items-center  space-x-2"
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

    <template #slider >
     <activity></activity>
    </template>

  </MyCompostion>
</template>

<script>
import articleShow from "@/components/pub/articleShow";

import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/vue/20/solid'
import Account from "@/components/pub/account.vue";
import MyCompostion from "@/components/pub/MyCompostion.vue";
import Activity from "@/components/pub/activity.vue";

export default {
  name: "articles",
  components: {
    Activity,
    MyCompostion,
    Account,
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
    getArticlesDefault() {
      let pageReq = {
        pageSize: this.pageSize,
        pageNo: this.currentPage
      }
      this.$axios.post('/article/list',pageReq).then((res) => {
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

</style>