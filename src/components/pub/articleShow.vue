<template>
  <div class="  w-full ">
    <template v-if="$loading">
      <!--      <a-skeleton active/>-->
      <!--      <a-skeleton active/>-->
      <!--      <a-skeleton active/>-->
      <loader></loader>
    </template>

    <template v-else>
      <el-empty v-if="articles.length===0" description="暂无文章"/>

      <!--      文章展示-->
      <div v-for="(article,index) in myArticles" v-else :key="article.articleId"
           class="w-full overflow-hidden bg-gray-100 space-y-2  py-2 px-3 lg:px-5 rounded-xl mb-2">

        <div v-if="!mySelf" class="text-left flex justify-start items-center space-x-1">
          <avatar :user-id="article.userId">
            <img class="h-10 w-10 rounded-full "
                 :src="article.author.userProfilePhoto"/>
          </avatar>

          <div class="h-full flex-col justify-around items-start">
            <div class="text-xs  lg:text-sm font-medium  " @click="$router.push('/user/'+article.userId)">
              <!--              <span class="iconfont">&#xe6b3;</span> -->
              {{ article.author.userNickname }}
            </div>
            <div class="text-gray-500 text-xs">{{ $moments(article.articleUpdateDate) }}</div>
          </div>
        </div>
        <div class="text-left lg:text-base font-bold text-sm cursor-pointer group"
             @click="$router.push('/article/'+article.articleId)"
             :title="article.articleTitle">
          <span class="group-hover:text-gray-500 lg:group-hover:text-xl duration-300 transition-all">
          {{ article.articleTitle }}</span>
        </div>
        <div class="h-auto max-h-20 lg:max-h-40 group w-full lg:space-x-3 flex justify-start  overflow-hidden ">
          <div v-if="article.articlePic!='' && article.articlePic!=null"
               class=" hidden lg:inline-flex items-center justify-start float-left"
               :class="{'w-1/4':article.articlePic!='' && article.articlePic!=null}"
          >
            <el-image
                :class="{hidden:article.articlePic=='' || article.articlePic==null}"
                :preview-src-list="[p(article.articlePic)]"
                :src="p(article.articlePic)"
                close-on-press-escape
                fit="cover"
                hide-on-click-modal
            />
          </div>
          <div
              @click="$router.push('/article/'+article.articleId)"
              class=" content p-2 rounded-xl group-hover:bg-white transition duration-500
               text-left text-gray-600 font-medium leading:6 lg:leading-7   truncate  text-xs lg:text-sm
               justify-items-start  float-left w-full "
              :class="{'lg:w-3/4':article.articlePic!='' && article.articlePic!=null}"
          >
              <span class="hover:cursor-pointer"
                    v-html="article.articleContent"></span>
          </div>
        </div>


        <div v-if="!mySelf" class="flex justify-center items-center h-6 w-full space-x-2 ">

          <a class="tools" @click="like(article.articleId,index)">
            <icon src="gclzwloa" trigger="click" size="24" class1="transform rotate-180"></icon>
            {{ article.articleLikes }} </a>
          <a class="tools" @click="comment(article.articleId)">
            <icon src="hpivxauj" trigger="click" size="24"></icon>
            {{ article.articleComments }} </a>
          <a class="tools" @click="collect(article.articleId,index)">
            <icon src="whttoese" trigger="click" size="24"></icon>
            {{ article.articleCollects }} </a>
          <a class="tools" @click="share(article.articleId,index)">
            <icon src="vpzjmdjv" size="24"></icon>
          </a>

        </div>
      </div>
      <!--        <a-divider class="h-px my-0 bg-green-600 bg-opacity-20"/>-->


    </template>

  </div>

</template>

<script>

import Avatar from "@/components/pub/avatar.vue";

export default {

  name: 'articleShow',
  components: {Avatar},
  props: {
    articleList: {
      type: Array,
      default: () => []
    }, mySelf: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    // articles(val) {
    //   if (val.length > 0) {
    //     console.log(val[0])
    //   }
    // }
  },

  data() {
    return {
      articles: [
        {
          articleId: 1,
          articleTitle: '文章标题',
          articleContent: '文章内容',
          articlePic: '',
          author: {
            userNickname: '作者昵称',
            userProfilePhoto: '作者头像'
          },
          articleUpdateDate: '2020-05-27 15:36:05',
          articleLikes: 0,
          articleComments: 0,
          articleCollects: 0,

        },

      ],
    }
  },
  computed: {

    myArticles() {
      this.articles = this.articleList

      // 根据articleList中每个article的userId获取user信息
      this.articleList.forEach((item, index) => {
        this.$store.dispatch('getUserById', item.userId).then(res => {
          this.articles[index].author.userProfilePhoto = res.userProfilePhoto
          this.articles[index].author.userNickname = res.userNickname
        })
      })
      return this.articles
    }

  },
  methods: {
    share(articleId) {
      this.showShare = true
      // this.$message.success("分享成功")
    },
    collect(articleId, index) {
      this.$axios.put("/article/collect/" + articleId).then((res) => {
        if (res.data.code === 200) {
          if (res.data.data == "取消收藏成功") {
            this.articles[index].articleCollects -= 1
          } else {
            this.articles[index].articleCollects += 1
          }
        } else {
          this.$st(res.data.data, 'error')
        }


      })
    },
    comment(articleId) {
      this.$router.push("/article/" + articleId + '#comment')
    },
    like(articleId, index) {
      this.$axios.put("/article/like/" + articleId).then((res) => {
        if (res.data.code === 200) {

          if (res.data.data == "取消点赞成功") {
            this.articles[index].articleLikes -= 1
          } else {
            this.articles[index].articleLikes += 1
          }
        } else {
          this.$st(res.data.data, 'error')
        }


      })
    }
  },
  mounted() {
    // console.log(this.articleList)
    this.$loading = false
  },


}

</script>

<style scoped>

:deep(.at p) {
  display: inline-block !important;
}

:deep(video, img) {
  width: 60%;
  margin-left: 20%;
  border-radius: 10px;
}

:deep(.content img, .content video) {
  max-height: 10rem !important;
  margin: 0 auto;
//margin-left: 25% !important; border-radius: 0;
}

:deep(.el-image) {
  border-radius: 5px;
}
</style>