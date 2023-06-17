<template>
  <bread>我的草稿</bread>
  <MyCompostion>
    <div class="text-left w-full h-screen mx-auto">
      <template v-if="loading">
        <!--      <a-skeleton active/>-->
        <!--      <a-skeleton active/>-->
        <!--      <a-skeleton active/>-->
        <loader></loader>
      </template>

      <template v-else>

        <el-empty v-if="articleList.length===0">
          <template #description>
            <span>暂无草稿</span>
          </template>
          <button class="button w-full mx-auto " @click="$router.push('/write/0')">去创作</button>
        </el-empty>
        <!--      文章展示-->
        <!--      <div class="Article" v-for="(article,index) in myScripts" :key="article.articleId">-->

        <!--        <div v-if="article.articlePic!=null && article.articlePic!==''" class="img">-->
        <!--          <img alt="文章头部图" :src="p(article.articlePic)"/>-->
        <!--        </div>-->

        <!--        <div class="right"-->
        <!--             :class="{isFull:article.articlePic==null || article.articlePic===''}">-->
        <!--          <div class="at"><a>-->
        <!--            <router-link :to="'/article/'+article.articleId"><span class="iconfont"-->
        <!--                                                                   v-html="'&#xe630;'+article.articleTitle"></span>-->
        <!--            </router-link>-->
        <!--          </a>-->
        <!--          </div>-->

        <!--          <div class="author"><span class="iconfont">&#xe6fb;</span> 更新时间: {{ article.articleUpdateDate }}-->
        <!--          </div>-->
        <!--          <div class="comment"><span v-html="article.articleContent"></span></div>-->

        <!--          <div class="toolbar">-->
        <!--            <a class="like" @click="deleteArticle(article.articleId)">删除<span class="iconfont">&#xe611;</span> </a>-->
        <!--            <a class="reply" @click="modifyArticle(article.articleId)">修改<span class="iconfont">&#xe615;</span> </a>-->
        <!--            <a class="collect" @click="shareArticle(article.articleId)">分享<span class="iconfont">&#xe73a;</span> </a>-->
        <!--            <a class="share">其他<span class="iconfont">&#xe63e;</span> </a>-->
        <!--          </div>-->

        <!--        </div>-->
        <!--        <a-divider style="height: 2px; background-color: #afb2b2"/>-->

        <!--      </div>-->


        <div class="m-auto overflow-hidden rounded-lg shadow-lg cursor-pointer h-90  pb-2  w-60 lg:w-80"
             v-for="(article,index) in myScripts" :key="article.articleId">
          <a @click="$router.push('/article/'+article.articleId)" class="block w-full h-full">
            <img v-if="article.articlePic!=null && article.articlePic!==''" :src="p(article.articlePic)"
                 class="object-cover w-full max-h-40"/>
            <div class="w-full p-4 h-40 overflow-hidden bg-white dark:bg-gray-800">
              <p class="font-medium text-indigo-600 hover:text-indigo-500 text-base">
                {{ article.articleTitle }}
              </p>

              <p class="font-light truncate text-gray-400 dark:text-gray-300 text-md">
                <span v-html="article.articleContent"></span>

              </p>
            </div>
          </a>

          <div class="w-full flex h-6  space-x-4 justify-center items-center">
            <a class="tools hover:animate-ping" @click="publishArticle(article.articleId)">
              <icon src="isugonwi" size="24"><span>发布</span></icon>
            </a>
            <a class="tools  hover:animate-ping" @click="modifyArticle(article.articleId)">
              <icon src="wloilxuq" size="24"><span>编辑</span></icon>
            </a>
            <a class="tools  hover:animate-ping" @click="deleteArticle(article.articleId)">
              <icon src="kfzfxczd" size="24"><span>删除</span></icon>
            </a>

          </div>
        </div>


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
      </template>
    </div>
  </MyCompostion>


</template>

<script>
import Swal from 'sweetalert2'
import MyCompostion from "@/components/pub/MyCompostion.vue";

export default {
  name: 'scripts',
  components: {MyCompostion},
  // props: [],
  data() {
    return {
      loading: true,
      articleList: [
        //     {
        //   articleId: -1,
        //   userId: -1,
        //   articleTitle: '测试标题',
        //   articleContent: '测试内容',
        //   articlePic: '',
        //   author: '作者',
        //   articleUpdateDate: '2020-05-27 15:36:05'
        // }

      ],
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

    }
  },
  computed: {
    myScripts() {
      this.articles = this.articleList
      //根据articleList中每个article的userId获取user信息
      this.articleList.forEach((item, index) => {
        this.articleList[index].articleUpdateDate = this.$moments(this.articleList[index].articleUpdateDate)
        this.$axios.get("/user/" + item.userId).then((res) => {
          if (res.data.code === 200) {
            this.articles[index].author = res.data.data.userNickname
          }
        })
      })
      return this.articles
    }
  },
  created() {
    //获取articleList
    this.getArticles()
  },
  watch: {
    myScripts() {

      this.$nextTick(() => {
        this.loading = false
      })
    }
  },
  methods: {
    getArticles() {
      this.$axios.get('/article/slist/user/' + this.$store.state.user.userId + '/' + this.currentPage + '/' + this.pageSize).then((res) => {
        // console.log(res.data.data)
        let map = res.data.data
        this.articleList = map.records
        this.total = map.total
        this.pageCount = map.pages
        this.pageSize = map.size
        this.currentPage = map.current

      })
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.currentPage = 1
      this.getArticles()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val
      this.getArticles()
    },
    deleteArticle(articleId) {
      //弹窗提示删除文章
      Swal.fire({
        title: '要删除这篇文章吗?',
        text: "删除之后就恢复不了啊!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.value) {
          this.$axios.delete('/article/' + articleId).then((res) => {

                if (res.data.code !== 200) {
                  this.$sa(res.data.msg, 'error')
                  return;
                }
                this.$st("删除成功", 'success')
                this.getArticles()
              }
          )
        }
      })

    },

    modifyArticle(articleId) {
      this.$router.push('/write/' + articleId)
    },
    publishArticle(articleId) {
      this.$axios.put('/article/publish/' + articleId).then((res) => {
        if (res.data.code !== 200) {
          this.$sa(res.data.msg, 'error')
          return;
        }
        this.$st("发布成功", 'success')
        this.getArticles()
        this.$router.replace('/article/' + articleId)
      })
    }


  },

}


</script>

<style scoped>


:deep(.el-pagination) {
  width: 100%;
}

.iconfont {
  /*font-size: 20px;*/
}

:deep(.at p) {
  display: inline-block !important;
}

.toolbar {
  width: 100%;
  height: 10%;
  text-align: center;

}

.toolbar a {
  font-size: 13px;
  color: #8590a6;
  float: left;
  display: block;
  width: 25%;
  height: 100%;
  line-height: calc(200%);
  margin-top: 10px;
  border-radius: 5px;
}

.toolbar a:hover {
  background-color: #edf3f4;
  transition: all 0.3s;

}

.whole {
  margin-left: calc(22.5%);
  background: #fff;
  width: 55%;
  border-radius: 5px;
  margin-top: 60px;
  padding: 10px;
}

.whole > div {
  width: 100%;
}

.whole .Article {
  position: relative;
  border-radius: 5px;
  height: 250px;
  margin: 20px 0;
}

.whole .Article .img {
  float: left;
  margin: 40px 10px;
  height: 67%;
  width: 27%;
  border-radius: 10px;
  /*box-shadow: 1px 3px 11px #134857;*/
}

.Article .img img {
  height: 100%;
  width: 100%;
  border-radius: 5px;
}

.right {
  float: left;
  height: 100%;
  width: 70%;
  padding: 0 0 0 10px;
}

.right .at {
  width: 100%;
  height: 15%;
  line-height: 30px;
  font-size: 15px;
  text-align: left;
  -webkit-mask-image: -webkit-linear-gradient(right, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 1) 10%);

}

.right .at a {
  display: block;
  color: #132c33;
  height: 100%;
  width: 100%;
  font-weight: 600;
}

.right .author {

  height: 10%;
  line-height: 25px;
  font-size: 13px;
  color: #8590a6;
  text-align: left;
}

.right .comment {
  height: 60%;
  width: 100%;
  font-size: 13px;
  text-align: left;
  overflow: hidden;
  color: #8590a6;
  line-height: 25px;
  margin-top: -2px;
  -webkit-mask-image: -webkit-linear-gradient(bottom, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 1) 10%);
}

.isFull {
  width: 80%;
  margin-left: 10%;
}
</style>