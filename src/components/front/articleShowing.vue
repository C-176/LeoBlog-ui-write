<template>
  <bread>文章</bread>
  <MyCompostion :slider="true">

    <div class="mx-auto w-full relative bg-white  mb-2">
      <template v-if="loading">
        <!--      <a-skeleton active/>-->
        <!--      <a-skeleton active/>-->
        <!--      <a-skeleton active/>-->
        <loader></loader>
      </template>

      <template v-else>

        <img v-if="article.articlePic!=''&&article.articlePic!=null"
             class="p-2 lg:p-0 bg-white mb-2 rounded-xl w-full mx-auto"
             :src="p(article.articlePic)"/>
        <div class="p-5 bg-gray-100 rounded-xl">
          <div class="text-xl lg:text-xl text-left h-auto w-full font-bold my-0.5">{{
              article.articleTitle
            }}
          </div>
          <div class="w-full h-auto">
            <div class="text-left">
              <Tag :color="getColor()" class="cursor-pointer " v-for="label in article.labels"
                   :key="label.labelId">
                {{ label.labelName }}
              </Tag>
            </div>
          </div>
          <div class="w-full flex items-center space-x-2 h-16">
            <!--            <user :user="article.user">-->
            <!--          <img class="left" :src="p(article.user.userProfilePhoto)"/>-->
            <avatar :user-id="article.userId">
              <a-avatar
                  :src="p(article.user.userProfilePhoto)"
                  :style="{ backgroundColor: '#067061'  ,verticalAlign: 'middle'}"
                  class="left  rounded-full "
                  shape="circle"
                  size="small"
              >
                {{ article.user.userNickname }}
              </a-avatar>
            </avatar>
            <!--            </user>-->
            <div class="flex-col items-start space-x-0 justify-center text-left">
              <div class="text-sm font-bold">{{ article.user.userNickname }}</div>
              <div class="text-xs">{{ article.user.userCertification }}</div>

            </div>
            <div class="flex items-center text-gray-500 space-x-1 pl-2">
              <icon src="qznlhdss" size="16"></icon>
              <span>最后更新时间: {{ this.$simpleFormat(article.articleUpdateDate) }}</span>

            </div>
          </div>
          <hr>
          <div class="text-left p-3 content" ref="articleContent">
            <span class="text-gray-600" v-html="article.articleContent"></span>
          </div>


          <a-divider style="height: 1px"/>
          <!--      <el-affix position="bottom" target=".content" :offset="10">-->

          <template v-if="article.isArticle === 1">
            <div class="w-full relative flex justify-around items-center">
              <a class="tools " @click="like(article.articleId) ">
                <icon src="gclzwloa" size="24" class1="transform rotate-180"></icon>
                {{ article.articleLikes }} </a>
              <a class="tools reply" @click="comment()">
                <icon src="hpivxauj" size="24"></icon>
                {{ article.articleComments }} </a>
              <a class="tools" @click="collect(article.articleId)">
                <icon src="whttoese" size="24"></icon>
                {{ article.articleCollects }} </a>
              <a class="tools" @click="share(article.articleId)">
                <icon src="vpzjmdjv" size="24"></icon>
              </a>


              <div
                  v-if="logined"
                  :class="{
            'opacity-100 ': showComment,
            'opacity-0  -translate-x-96': !showComment
               }"
                  class="ti  absolute top-10 uf w-full  border-1 ring-1 border-indigo-300 bg-white rounded-2xl p-2 z-10 flex justify-start transition duration-500">
                <div class="w-full ls ys abe mt-2">
                  <div class="uk">
                    <img class="lq nc re adn border border-indigo-600"
                         :src="$store.state.user.userProfilePhoto"
                         alt=""></div>
                  <div class="tl uh">
                    <div class="ab">
                      <div class="focus-within:bg-white adb border-0 ring-0 ado bbi bbo bbs bca bgu bgz">
                        <textarea v-model="commentIn"
                                  @keyup.enter.stop="saveComment(-1)"
                                  rows="3" name="comment" id="comment"
                                  class="bg-white focus-visible:outline-0 lp ti xo p-2 text-gray-400 aev alh arl axq bfy bmx cht chv"
                                  placeholder="添加评论..."></textarea>
                        <div class="arq" aria-hidden="true">
                          <div class="asb">
                            <div class="od"></div>
                          </div>
                        </div>
                      </div>
                      <div class="aa aj bx ls arq ath flex justify-end atv">
                        <button @click="saveComment(-1,article.user.userId)"
                                class="lt yu adp ajm ara arq avv awb bac bbi bin bot bou bow bpf">发送
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

      </template>

      <div id="comment">
        <comment-template v-if="article.isArticle === 1"
                          :comments="comments" :method="getComments">
        </comment-template>
      </div>
    </div>
    <shareModal :class="{
      'opacity-100 ': showShare,
      'opacity-0 hidden': !showShare
    }"
                class="ease-in-out transition-all duration-500"
                @close="()=>{showShare=false}" :showShare="showShare"></shareModal>
    <!--      <div-->
    <!--          class="hidden px-2 lg:px-1 my-3 w-full  mx-auto text-slate-700 dark:text-white-->
    <!--       flex flex-col items-center"-->
    <!--      >-->
    <!--        <div-->
    <!--            class="text-left flex flex-col w-full items-center justify-center lg:p-4-->
    <!--        border-slate-300 dark:border-slate-600 rounded-xl">-->
    <!--          <div class="w-full">-->
    <!--            <a-->
    <!--                @click="$router.push('/article/'+articleList[otherIndex].articleId)"-->
    <!--                rel="noreferrer"-->
    <!--                target="_blank"-->
    <!--                class="bg-white dark:bg-slate-800 rounded-xl w-full flex flex-col-->
    <!--            lg:flex-row justify-start shadow-md transition-all duration-500 lg:hover:scale-95"-->
    <!--            >-->
    <!--              &lt;!&ndash; <div class="flex-grow"> &ndash;&gt;-->
    <!--              <div v-if="articleList[otherIndex].articlePic == null || articleList[otherIndex].articlePic == ''"-->
    <!--                   class="flex-grow w-full h-64 lg:bg-center shadow bg-cover rounded-t-xl lg:rounded-none lg:rounded-l-xl"-->
    <!--                   style=' background-image: url("http://49.235.100.240:8080/source/upload/images/c2aaf2de-e0d6-4c90-a42d-bf4c7f34e1ef.png");'-->
    <!--              >-->
    <!--              </div>-->
    <!--              <div v-else-->
    <!--                   class="flex-grow w-full h-64 lg:bg-center shadow bg-cover rounded-t-xl lg:rounded-none lg:rounded-l-xl"-->
    <!--                   :style="'background-image: url(' + articleList[otherIndex].articlePic + ');'"-->
    <!--              >-->
    <!--              </div>-->
    <!--              &lt;!&ndash; </div> &ndash;&gt;-->

    <!--              <div class="w-full xl:w-1/2 p-3 flex flex-col justify-between h-40 lg:h-64 overflow-auto">-->
    <!--                <div>-->
    <!--                  <div class="flex flex-col lg:w-full text-sm text-left">-->
    <!--                            <span class="text-blue-700 dark:text-blue-300">-->
    <!--                                {{ $moments(articleList[otherIndex].articleUpdateDate) }}-->
    <!--                            </span>-->

    <!--                  </div>-->
    <!--                  <p class="text-left text-sm lg:text-lg xl:text-xl font-bold leading-normal">-->
    <!--                    连接世界-->
    <!--                  </p>-->
    <!--                </div>-->
    <!--                <p class="flex text-left text-xs lg:text-sm text-blue-700 dark:text-blue-400 font-bold leading-normal items-center">-->
    <!--                  <svg-->
    <!--                      height="21"-->
    <!--                      viewBox="0 0 21 21"-->
    <!--                      width="21"-->
    <!--                      xmlns="http://www.w3.org/2000/svg"-->
    <!--                  >-->
    <!--                    <g-->
    <!--                        fill="none"-->
    <!--                        fillRule="evenodd"-->
    <!--                        stroke="currentColor"-->
    <!--                        strokeLinecap="round"-->
    <!--                        strokeLinejoin="round"-->
    <!--                        transform="translate(6 6)"-->
    <!--                    >-->
    <!--                      <path d="m8.5 7.5v-7h-7"></path>-->
    <!--                      <path d="m8.5.5-8 8"></path>-->
    <!--                    </g>-->
    <!--                  </svg>-->
    <!--                  {{ articleList[otherIndex].articleTitle }}-->
    <!--                </p>-->
    <!--              </div>-->
    <!--            </a>-->
    <!--          </div>-->
    <!--          <div class=" w-full mt-2">-->
    <!--            <div class="flex justify-center">-->
    <!--              <div-->
    <!--                  class="bg-white dark:bg-slate-800 rounded-xl shadow-md flex w-full lg:w-2/3 p-0 justify-between h-12 lg:h-fit items-center">-->
    <!--                <button-->
    <!--                    class="border-slate-500 dark:border-slate-100 hover:text-blue-500 dark:hover:text-blue-400 border hover:border-blue-500 dark:hover:border-blue-400 w-6 h-6 rounded-xl duration-150 hover:scale-105 active:scale-95"-->
    <!--                    @click="otherIndex == 0 ? otherIndex = articleList.length - 1 : otherIndex&#45;&#45;"-->
    <!--                >-->
    <!--                  <svg-->
    <!--                      height="22"-->
    <!--                      viewBox="0 0 21 21"-->
    <!--                      width="22"-->
    <!--                      xmlns="http://www.w3.org/2000/svg"-->
    <!--                  >-->
    <!--                    <g-->
    <!--                        fill="none"-->
    <!--                        fillRule="evenodd"-->
    <!--                        stroke="currentColor"-->
    <!--                        strokeLinecap="round"-->
    <!--                        strokeLinejoin="round"-->
    <!--                        transform="translate(2 2)"-->
    <!--                    >-->
    <!--                      <path d="m9.55 11.4-3-2.9 3-3"></path>-->
    <!--                    </g>-->
    <!--                  </svg>-->
    <!--                </button>-->
    <!--                <button-->
    <!--                    @click="$router.push('/article/'+articleList[otherIndex].articleId)"-->
    <!--                    class="bg-indigo-600 h-3 transition-all w-3 self-center duration-300 hover:scale-150 active:scale-125 ease-in-out rounded-md xl:p-1 shadow"-->
    <!--                ></button>-->
    <!--                <button-->
    <!--                    class="border-slate-500 dark:border-slate-100 hover:text-blue-500 dark:hover:text-blue-400 border hover:border-blue-500 dark:hover:border-blue-400 w-6 h-6 rounded-xl duration-150 hover:scale-105 active:scale-95"-->
    <!--                    @click="otherIndex == articleList.length - 1 ? otherIndex = 0 : otherIndex++"-->
    <!--                >-->
    <!--                  <svg-->
    <!--                      height="22"-->
    <!--                      viewBox="0 0 21 21"-->
    <!--                      width="22"-->
    <!--                      xmlns="http://www.w3.org/2000/svg"-->
    <!--                  >-->
    <!--                    <g-->
    <!--                        fill="none"-->
    <!--                        fillRule="evenodd"-->
    <!--                        stroke="currentColor"-->
    <!--                        strokeLinecap="round"-->
    <!--                        strokeLinejoin="round"-->
    <!--                        transform="translate(2 2)"-->
    <!--                    >-->
    <!--                      <path d="m7.5 11.5 3-3-3.068-3"></path>-->
    <!--                    </g>-->
    <!--                  </svg>-->
    <!--                </button>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->

    <div class="gs tv px-1">
      <div class="gs tq csw cxc">
        <div class="ls yu za">
          <a-divider orientation="center">最新文章</a-divider>
        </div>
        <a @click="$router.push('/home/article')" class="avv awb cursor-pointer awk ayc bla">查看全部</a>
        <ul role="list" class="lf lw yb aar cyi space-x-1">
          <li class="adb ads aeu afp hover:shadow-xl duration-300 transition" v-for="(a1,index) in articleList"
              :id="a1.articleId">
            <div class="ls yu aab afa afx ail aqq bg-auto box "
                 :style="{'background-image':'url('+a1.articlePic+')'}"
            >
              <avatar :user-id="userList[index].userId">
                <!--                     @click="$router.push('/user/'+userList[index].userId)"-->
                <img :src="userList[index].userProfilePhoto"

                     alt="Tuple"
                     class="ne rg uj ado alj apz bbo bcj"></avatar>
              <div class="avv avz awk axq">{{ userList[index].userNickname }}</div>
            </div>
            <dl class="gh abx aca arf arx avv awk text-left cursor-pointer"
                @click="$router.push('/article/'+a1.articleId)"
            >
              <div class="ls za aab aru">
                <div class="axm ">{{ a1.articleTitle }}</div>
              </div>
              <div class="ls za aab aru">
                <div class="axm">发布时间</div>
                <div class="ls ys zx space-x-0.5">
                  <div class="avz axq">{{ this.$simpleFormat(a1.articleUpdateDate, '', true) }}</div>
                  <!--                  <div class="ayy akj bdf adp ark aqy avx avz bbo bbs">Overdue</div>-->
                </div>
              </div>
            </dl>
          </li>

        </ul>
      </div>
    </div>
    <bgCover :showCover="showShare"></bgCover>

    <template #slider>
      <catlog :container="container"></catlog>
    </template>
  </MyCompostion>
  <!--  显示放大图片的组件-->
  <big-img :visible="photoVisible" :url="bigImgUrl" @closeClick="()=>{photoVisible=false}"></big-img>

</template>

<script>
import h from "@/components/pub/header";
import commentTemplate from "@/components/pub/commentTemplate";
import {Divider, Tag} from 'ant-design-vue';
import {EnterOutlined} from '@ant-design/icons-vue';
import user from "@/components/pub/user";
import bigImg from "@/components/pub/bigImg";
import catlog from "@/components/pub/catlog";
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import shareModal from "@/components/pub/shareModal";
import MyCompostion from "@/components/pub/MyCompostion.vue";
import MyModal from "@/components/pub/myModal.vue";


export default {
  name: 'forward-article',
  components: {
    MyModal,
    MyCompostion,
    h,
    commentTemplate,
    Divider,
    Tag,
    EnterOutlined,
    user,
    bigImg,
    catlog,
    shareModal
  },
  data() {
    return {
      banner: 'url(../img/home_bg.png)',
      otherIndex: 0,
      articleList: [],
      userList: [],
      showShare: false,
      container: '#xxxxxxxxxxxx',
      photoVisible: false,
      bigImgUrl: "",
      loading: true,
      showComment: false,
      commentIn: '',
      colors: [
        'magenta',
        'red',
        'volcano',
        'orange',
        'gold',
        'lime',
        'green',
        'cyan',
        'blue',
        'geekblue',
        'purple'
      ],
      article: {
        articleId: 1,
        isArticle: 1,
        articleTitle: '',
        articleContent: '',
        articlePic: '',
        articleUpdateDate: '',
        articleLikes: 0,
        articleComments: 0,
        articleCollects: 0,
        labels: [],
        user: {
          userId: 1,
          userName: '',
          userProfilePhoto: '',
          userCertification: ''
        },
      },
      comments: [{
        articleId: 1,
        articleTitle: '',
        commentId: 1,
        user: {
          userId: 1,
          userName: '评论者',
          userProfilePhoto: 'https://pic2.zhimg.com/v2-3b5a34f6a7e09d1b1f6f21400af9de2c_xl.jpg?source=32738c0c',
        },
        commentContent: '评论内容',
        commentLikes: 0,
        commentUpdateTime: '2020-05-27 15:36:05',
        value: [{
          commentId: 1,
          user: {
            userId: 1,
            userNickname: '评论者',
            userProfilePhoto: 'https://pic2.zhimg.com/v2-3b5a34f6a7e09d1b1f6f21400af9de2c_xl.jpg?source=32738c0c',
          },
          commentParentId: 0,
          commentUpdateTime: "2020-05-27 15:36:05",
          commentLikes: 0,
          commentContent: " 你说咱们这个专业从事什么最好"
        }, {
          commentId: 2,
          commentLikes: 1000,
          user: {
            userId: 0,
            userProfilePhoto: 'https://pic2.zhimg.com/v2-3b5a34f6a7e09d1b1f6f21400af9de2c_xl.jpg?source=32738c0c',
            userNickname: '回复人',
          },
          commentParentId: 0,
          commentUpdateTime: "2020-05-27 15:36:05",
          commentContent: "2.那么怎么知道左子树与右子树对不对称呢？在这我直接叫为左树和右树 答案：如果左树的左孩子与右树的右孩子对称，左树的右孩子与右树的左孩子对称，那么这个左树和右树就对称。"
        },

        ]
      }
      ]

    }
  },
  created() {
    this.$axios.get(this.baseURL + "/article/" + this.$route.params.articleId).then((res) => {
      if (res.data.code === 200) {
        this.article = res.data.data
        //将articleUpdateDate转换为yyyy-MM-dd HH:mm:ss格式
        this.article.articleUpdateDate = this.$simpleFormat(this.article.articleUpdateDate)
      }
    })
    // 取出this.article 前三个元素

    // this.articleList = [this.article.slice(0, 3)]

    //获取评论
    this.getComments()

    this.getArticlesDefault()


  },
  computed: {
    logined() {
      return this.$store.state.user != null
    }
  },

  mounted() {
    setTimeout(() => {
      //给所有图片添加点击事件
      let imgs = document.querySelectorAll('.content img')
      if (imgs.length == 0) {
        setTimeout(() => {
          imgs = document.querySelectorAll('.content img')
          imgs.forEach((item) => {
            item.addEventListener('click', () => {
              this.photoVisible = true
              this.bigImgUrl = item.src
            })
          })
        }, 1000)
      } else {
        imgs.forEach((item) => {
          item.addEventListener('click', () => {
            this.photoVisible = true
            this.bigImgUrl = item.src
          })
        })
      }
    }, 200)


  }
  ,
  methods: {
    getArticlesDefault() {
      let pageReq = {
        pageNo:1,
        pageSize:20

      }
      this.$axios.post('/article/list',pageReq).then((res) => {
        let map = res.data.data
        var articleList = map.records
        articleList = articleList.filter(x => x.articleId !== this.article.articleId)
        // 在articleList中随机取出三个元素
        articleList = articleList.sort(() => {
          return 0.5 - Math.random()
        })
        articleList = articleList.slice(0, 3)
        for (let i = 0; i < articleList.length; i++) {
          this.$store.dispatch('getUserById', articleList[i].userId).then((res) => {
            this.userList.push(res)
          })
        }
        setTimeout(() => {
          this.articleList = articleList
        }, 1000)


        // this.article1 = this.articleList[this.otherIndex]
        // console.log(this.articleList)
      })
    },
    getColor() {
      return this.colors[Math.floor(Math.random() * this.colors.length)]
    },
    share(articleId) {
      // this.$st("分享成功", "success")
      this.showShare = true
    },
    closeShare() {
      this.showShare = false

    },
    collect(articleId) {
      if (!this.checkLogin()) {
        return
      }
      this.$axios.put("/article/collect/" + articleId).then((res) => {
        if (res.data.code === 200) {
          if (res.data.data == "取消收藏成功") {
            this.article.articleCollects -= 1
          } else {
            this.article.articleCollects += 1
          }
        } else {
          this.$st(res.data.data, 'error')
        }

      })
    },
    like(articleId) {
      if (!this.checkLogin()) {
        return
      }
      this.$axios.put("/article/like/" + articleId).then((res) => {
        if (res.data.code === 200) {

          if (res.data.data == "取消点赞成功") {
            this.article.articleLikes -= 1
            this.$st(res.data.data, 'success')
          } else {
            this.article.articleLikes += 1
            this.$st(res.data.data, 'success')
          }
        } else {
          this.$st(res.data.data, 'error')
        }


      })
    },
    checkLogin() {
      if (this.$store.state.user == null) {
        this.$st('请先登录', 'error')
        return false
      }
      return true
    },
    comment() {
      if (!this.checkLogin()) {
        return
      }
      this.showComment = !this.showComment
      if (!this.showComment) {
        this.commentIn = ""
        //清除行内样式
        document.getElementsByClassName("reply")[0].style.backgroundColor = ""
      } else {
        document.getElementsByClassName("reply")[0].style.backgroundColor = "#edf3f4"
      }

    },
    saveComment(commentParentId, commentUserId) {
      //输入框是否focus
      if (this.commentIn.trim() == "") {
        this.$st("评论内容不能为空", "error")
        this.commentIn = ""
        return
      }
      if (commentParentId == -1) {
        this.$axios.post(this.baseURL + "/comment/add", {
          userId: this.$store.state.user.userId,
          articleId: this.$route.params.articleId,
          commentParentId: -1,
          commentContent: this.commentIn,
          receiverId: this.article.user.userId
        }).then((res) => {
          if (res.data.code === 200) {
            this.$st(res.data.data, 'success')
            this.commentIn = ""
            this.article.articleComments += 1
            this.getComments()
            this.comment()

          } else {
            this.$st(res.data.data, 'error')
          }


        })
        return
      }
      this.$axios.post(this.baseURL + "/comment/add", {
        userId: this.$store.state.user.userId,
        articleId: this.$route.params.articleId,
        commentParentId: commentParentId,
        commentContent: this.commentIn,
        receiverId: commentUserId
      }).then((res) => {
        if (res.data.code === 200) {
          this.$st(res.data.data, 'success')
          this.commentIn = ""
          this.getComments()

        } else {
          this.$st(res.data.data, 'error')
        }


      })

    },
    getComments() {
      this.$axios.get(this.baseURL + "/comment/list/article/" + this.$route.params.articleId).then((res) => {
        if (res.data.code === 200) {
          this.comments = res.data.data
          this.comments.forEach((item) => {
            item.articleTitle = ''
            item.articleId = this.article.articleId
            item.commentUpdateTime = this.$simpleFormat(item.commentUpdateTime)
            item.value.forEach((item3) => {
              item3.commentUpdateTime = this.$simpleFormat(item3.commentUpdateTime)
            })
          })

        }
      })
    }

  },
  watch: {
    article() {
      this.$nextTick(() => {
        this.loading = false
        this.container = '.content'
      })
    }
  }
}

</script>

<style scoped>
:deep(video) {
  width: 80%;
  margin-left: 10%;
  /*height: 100%;*/
  border-radius: 10px;
}

:deep(p img,p video) {
  border-radius: 10px;
  max-height: calc(100vh - 5rem);
  margin: 0 auto;
  margin-bottom: 10px !important;
  margin-top: 5px !important;
  box-shadow: 1px 3px 11px #134857;

}

:deep(p img:hover) {
  cursor: pointer !important;
}

:deep(span img,span video) {
//width: 80% !important; //margin-left: 10% !important;
  /*height: 100%;*/
  border-radius: 10px;
  max-height: calc(100vh - 5rem);
  margin: 0 auto;
  margin-bottom: 5px !important;
  box-shadow: 1px 3px 11px #134857;

}

:deep(span img:hover) {
  cursor: pointer !important;
}

:deep(pre) {
  color: #857e7e !important;
//background: #fff !important; border-radius: 10px !important; padding: 10px !important;
}

:deep(li) {
//font-size: 16px; /* 设置字体大小 */ color: #666; /* 设置字体颜色 */ margin-bottom: 4px; /* 设置下方的间距 */ //list-style-color: #4f46e5; /* 设置列表标记颜色 */
}

:deep(.content ol) {
  list-style-type: decimal; /* 设置列表标记为数字 */
  margin-left: 20px; /* 设置左边距 */
}


:deep(.content ul) {
  list-style-type: disc; /* 设置列表标记为圆点 */
  margin-left: 20px;

}

:deep(pre) {
  padding: 1em;
  overflow: auto;
  font-family: 'Courier New', Courier, monospace;
  background-color: #2c2c3b;
  border-radius: 0.25rem;
}

:deep(a) {
  color: #4f46e5;
  text-decoration: none;
}

:deep(code) {
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
}

:deep(blockquote) {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-left: 0.5rem solid #4f46e5;
  border-radius: 5px;
  margin: 1.5em 10px;
  padding: 0.5em 10px;

//padding: 1em; //margin: 0 0 1em; //color: #555; //border-left: 0.25em solid #dfe2e5; //background-color: #f8f9fa;
}

:deep(blockquote:before) {
  color: #4f46e5;
  content: open-quote;
  font-size: 4em;
  line-height: 0.1em;
  margin-right: 0.25em;
  vertical-align: -0.4em;
}

:deep(blockquote p) {
  display: inline;
}


:deep(h1) {
  font-size: 1.3rem;
  font-weight: bold;
  margin-left: -0.2rem !important;
}

:deep(h2) {
  font-size: 1.15rem;
  font-weight: bold;
  margin-left: -0.2rem !important;
}

:deep(h3) {
  font-size: 1.05rem;
  font-weight: bold;
  margin-left: -0.2rem !important;
}

:deep(h4) {
  font-size: 0.95rem;
  font-weight: bold;
  margin-left: -0.2rem !important;
}

:deep(h5) {
  font-size: 0.9rem;
  font-weight: bold;
  margin-left: -0.2rem !important;
}
</style>