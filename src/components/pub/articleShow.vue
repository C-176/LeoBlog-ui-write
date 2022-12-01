<template>
  <div class="  w-full ">
    <template v-if="$loading">
      <a-skeleton active/>
      <a-skeleton active/>
      <a-skeleton active/>
    </template>

    <template v-else>

      <el-empty v-if="articles.length===0" description="暂无文章"/>
      <!--      文章展示-->
      <div v-for="(article,index) in myArticles" v-else :key="article.articleId"
           class="w-full  overflow-hidden bg-white  p-5  my-2">
        <div>
          <div class="text-left text-xl font-bold "
               :title="article.articleTitle.replaceAll('<p>','').replaceAll('</p>','').replaceAll('<br>','')">
            <router-link :to="'/article/'+article.articleId">
              {{ article.articleTitle.replaceAll('<p>','').replaceAll('</p>','').replaceAll('<br>','')}}
            </router-link>
          </div>

          <div class="text-left text-base font-bold text-black my-1">
            <img class="inline-block  h-8 w-8 mr-2 rounded-full ring-2 ring-white" :src="article.author.userProfilePhoto" />

            <el-link class=""  @click="$router.push('/user/'+article.userId)">
<!--              <span class="iconfont">&#xe6b3;</span> -->
              {{ article.author.userNickname }}
            </el-link>
          </div>
          <div class="h-28 md:h-40 w-full flex justify-start  overflow-hidden m-3">
            <div v-if="article.articlePic!='' && article.articlePic!=null"
                 class=" hidden md:inline-flex items-center justify-start float-left w-1/4 ">
              <el-image
                  class="invisible rounded-xl md:visible"
                  :class="{invisible:article.articlePic=='' || article.articlePic==null}"
                  :preview-src-list="[p(article.articlePic)]"
                  :src="p(article.articlePic)"
                  close-on-press-escape
                  fit="cover"
                  hide-on-click-modal
              />
            </div>
            <div class="text-left text-gray-600 leading:6 md:leading-7  px-3 -my-1 text-sm  justify-items-start  float-left w-full md:w-2/3 ">
              <span class="hover:cursor-pointer" @click="$router.push('/article/'+article.articleId)"
                    v-html="article.articleContent"></span>
            </div>
          </div>


          <div class="flex justify-center items-center h-6 m-1 w-full ">
            <a class="tools " @click="like(article.articleId,index)">点赞<span
                class="iconfont ">&#xe605;</span>{{ article.articleLikes }} </a>
            <a class="tools" @click="comment(article.articleId)">评论<span
                class="iconfont">&#xe646;</span>{{ article.articleComments }} </a>
            <a class="tools" @click="collect(article.articleId,index)">收藏<span
                class="iconfont">&#xe8b9;</span>{{ article.articleCollects }} </a>
            <a class="tools" @click="share(article.articleId,index)">分享<span class="iconfont">&#xe73a;</span> </a>
          </div>
        </div>
<!--        <a-divider class="h-px my-0 bg-green-600 bg-opacity-20"/>-->

      </div>

    </template>

  </div>

</template>

<script>

export default {
  name: 'articleShow',
  props: ['articleList', 'scrollBottom'],
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
        this.$axios.get("/user/" + item.userId).then((res) => {
          if(res.data.code===200){
            // console.log(res.data.data.userNickname, res.data.data.userProfilePhoto)
            this.articles[index].author.userProfilePhoto = res.data.data.userProfilePhoto
            this.articles[index].author.userNickname = res.data.data.userNickname
          }
        })

      })
      // for(let i=0;i<this.articles.length;i++){
      //   this.$store.dispatch('getUserById', this.userId).then(res => {
      //     //获取promise中的信息
      //     this.articles[index].author = res.data.data.userNickname
      //   })
      // }
      return this.articles

    }


  },
  methods: {
    share(articleId) {
      this.$message.success("分享成功")
    },
    addCollectMessage(articleId) {
      let a = this.articles.find(item => item.articleId === articleId)
      this.$axios.post("/message/add", {
        messageTitle: "收藏了你的文章",
        messageContent: a.articleTitle,
        userId: this.$store.state.user.userId,
        receiverId: a.userId,
      }).then(res => {
        console.log(res.data.data)
      })
    },
    collect(articleId, index) {
      this.$axios.get("/article/collect/" + articleId).then((res) => {
        if (res.data.code === 200) {
          if (res.data.data == "取消收藏成功") {
            this.articles[index].articleCollects -= 1
          } else {
            this.articles[index].articleCollects += 1
            this.addCollectMessage(articleId)
          }
        } else {
          this.$st(res.data.data, 'error')
        }


      })
    },
    comment(articleId) {
      this.$router.push("/article/" + articleId+'#comment')
    },
    like(articleId, index) {
      this.$axios.get("/article/like/" + articleId).then((res) => {
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
</style>