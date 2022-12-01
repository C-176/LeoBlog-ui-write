<template>

  <div class="wholeDiv">
    <el-tabs type="border-card" class="demo-tabs" :model-value="tag" @tab-change="b">
      <el-tab-pane label="标题" name="title"></el-tab-pane>
      <el-tab-pane label="内容" name="content"></el-tab-pane>
      <el-tab-pane label="标签" name="label"></el-tab-pane>
      <el-tab-pane label="分类" name="sort"></el-tab-pane>
    </el-tabs>
    <article-show :article-list="articleList"></article-show>
    <el-pagination
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

export default {
  name: "articles",
  components: {
    articleShow
  },
  data() {
    return {
      labelId: 1,
      method: null,
      key: "",
      tag: 'title',
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
    this.key = this.$route.params.key;
    // console.log(this.key);
    if (this.key.trim() === '') {
      console.log("key为空");
      this.$router.push({url: '/home/article'})
    }
    this.method = this.getArticlesByKey
    this.method(this.key);
  }, methods: {
    b(name) {
      this.tag = name
      if (name === 'title') {
        this.method = this.getArticlesByKey
      } else if (name === 'content') {
        this.method = this.getArticlesByContent
      } else if (name === 'label') {
        this.method = this.getArticlesByLabel
      } else if (name === 'sort') {
        this.method = this.getArticlesBySort
      }
      this.$st(name, 'success')
      this.method(this.key)
    },
    getArticlesDefault() {
      this.$axios.get('/article/list/' + this.currentPage + '/' + this.pageSize).then((res) => {
        let map = res.data.data
        this.articleList = map.records
        this.total = map.total
        this.pageCount = map.pages
        this.pageSize = map.size
        this.currentPage = map.current
      })
    },
    getArticlesByKey(key) {
      this.$axios.get('/article/list/keyword/' + key + '/' + this.currentPage + '/' + this.pageSize).then((res) => {
        let map = res.data.data
        this.articleList = map.records
        this.total = map.total
        this.pageCount = map.pages
        this.pageSize = map.size
        this.currentPage = map.current
      })
    },
    getArticlesByContent(content) {
      this.$axios.get('/article/list/content/' + content + '/' + this.currentPage + '/' + this.pageSize).then((res) => {
        let map = res.data.data
        this.articleList = map.records
        this.total = map.total
        this.pageCount = map.pages
        this.pageSize = map.size
        this.currentPage = map.current
      })
    },
    getArticlesByLabel(key) {
      //查询title和content包含关键字的所有文章，展示出来，并将其标签列举出来
      //监听标签点击事件，点击标签后，列举出该标签下的文章
      const labelId = this.labelId
      if (this.articleList.length === 0) return;
      this.$axios.post('/article/list/label/' + labelId + '/' + this.currentPage + '/' + this.pageSize,
          {
            ids: this.articleList.map(item => item.articleId)
          }
      ).then((res) => {
        let map = res.data.data
        this.articleList = map.records
        this.total = map.total
        this.pageCount = map.pages
        this.pageSize = map.size
        this.currentPage = map.current
      })
    },
    getArticlesBySort(key) {
      this.$axios.get('/article/list/sort/' + key + '/' + this.currentPage + '/' + this.pageSize).then((res) => {
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
      // this.getArticlesDefault()
      this.method(this.key)

    },
    handleCurrentChange(val) {
      this.currentPage = val
      // this.getArticlesDefault()
      this.method(this.key)
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