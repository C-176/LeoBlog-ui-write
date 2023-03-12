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

      <!-- component -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mb-12">
        <article>
<!--          <h2 class="text-2xl font-extrabold text-gray-900">纸条们</h2>-->
          <section class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-8">
            <article v-for="(article,index) in myArticles" :key="article.articleId"
                class="relative bg-indigo-600 w-full h-64 bg-contain hover:scale-105 hover:shadow-xl transition duration-300 group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl  transition duration-300 ease-in-out"

                     :style="{backgroundImage: 'url(' + article.articlePic + ')'}">

              <div class="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out"></div>
              <div class="relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center">
                <h3 class="text-center">
                  <a class="text-white text-2xl font-bold text-center"
                     @click="$router.push('/article/'+article.articleId)">
                    <span class="absolute inset-0"></span>
                    {{ article.articleTitle }}
                  </a>
                </h3>
              </div>
            </article>

          </section>
        </article>
      </section>


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
          if (res.data.code === 200) {
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
      this.showShare = true
      // this.$message.success("分享成功")
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
      this.$router.push("/article/" + articleId + '#comment')
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

:deep(.content img, .content video) {
  max-height: 10rem !important;
  margin: 0 auto;
  //margin-left: 25% !important;
  border-radius: 0;
}

:deep(.el-image){
  border-radius: 5px;
}
</style>