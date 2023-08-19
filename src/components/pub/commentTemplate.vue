<template>
  <div class="w-full b-gray-100 p-0 my-1 rounded-xl text-left">
    <template v-if="loading">
      <!--      <a-skeleton active/>-->
      <!--      <a-skeleton active/>-->
      <!--      <a-skeleton active/>-->
      <loader></loader>
    </template>

    <template v-else>
      <el-empty v-if="comments.length===0">
        <template #description>
          暂无评论，快去发表你的评论吧
        </template>
      </el-empty>


      <template v-else>
        <!-- component -->
        <a-collapse v-for="(comment,index1) in comments" v-model:activeKey="activeKey" accordion>
          <a-collapse-panel :key="index1"
                            @dblclick="$router.push('/article/'+comment.articleId)"
                            :header="comment.articleTitle.trim().length == 0?comment.commentContent:comment.articleTitle">
            <div class=" w-full flex-col items-center justify-center space-y-1">

              <div class="bg-white w-full group rounded-2xl px-6 py-1 hover:shadow transition duration-500">

                <div class="flex justify-between items-center">
                  <div class=" flex items-center space-x-4 py-0">
                    <avatar :user-id="comment.user.userId">
                      <img class="w-8 h-8 rounded-full" :src="p(comment.user.userProfilePhoto)"
                           alt=""/></avatar>
                    <div class="text-sm text-gray-400 ">{{ comment.user.userNickname }} • <span
                        class="font-normal text-gray-400"> {{
                        comment.commentUpdateTime
                      }}</span></div>
                  </div>
                  <div
                      class="space-x-1 flex group-hover:opacity-100 opacity-0 transition duration-300 justify-end items-center">
                    <a-tooltip>
                      <template #title>回复</template>
                      <div v-if="comment.articleTitle.trim().length == 0"
                           @click="commentClick(comment.commentId,comment.userId)"
                           class="p-3 bg-indigo-300  rounded-full h-4 w-4 flex items-center justify-center text-2xl text-white  shadow-lg cursor-pointer">
                        +
                      </div>
                    </a-tooltip>
                    <a-tooltip v-if="logined && comment.user.userId == $store.state.user.userId">
                      <template #title>删除</template>
                      <div

                          @click="deleteComment(comment.commentId)"
                          class="p-3 bg-indigo-300  rounded-full h-4 w-4 flex items-center justify-center text-2xl text-white cursor-pointer">
                        ×
                      </div>
                    </a-tooltip>
                  </div>
                </div>
                <p class=" text-xs py-0.5  lg:text-sm text-gray-400"> {{ comment.commentContent }}</p>
              </div>


              <div v-for="(i,index2) in comment.value" :key="i.commentId"
                   class="bg-white w-full group rounded-2xl px-6 pl-10 py-1 hover:shadow transition duration-500">
                <div class="flex justify-between items-center">
                  <div class=" flex items-center space-x-4 py-0">
                    <avatar :user-id="i.user.userId">
                      <img class="w-8 h-8 rounded-full" :src="p(i.user.userProfilePhoto)" alt=""/></avatar>
                    <div class="text-sm text-gray-400 ">{{ i.user.userNickname }} • <span
                        class="font-normal text-gray-400"> {{ i.commentUpdateTime }}</span>
                    </div>
                  </div>
                  <div class="space-x-1 group-hover:opacity-100 opacity-0 flex justify-end items-center">
                    <a-tooltip>
                      <template #title>回复</template>
                      <div
                          v-if="comment.articleTitle.trim().length == 0"
                          @click="commentClick(comment.commentId,i.userId)"
                          class="p-3 bg-indigo-300 group:hover:invisible  transition duration-300 rounded-full h-4 w-4 flex items-center justify-center text-2xl text-white  shadow-lg cursor-pointer">
                        +
                      </div>
                    </a-tooltip>
                    <a-tooltip v-if=" logined && i.user.userId == $store.state.user.userId">
                      <template #title>删除</template>
                      <div

                          @click="deleteComment(i.commentId)"
                          class="p-3 bg-indigo-300 group:hover:invisible  transition duration-300 rounded-full h-4 w-4 flex items-center justify-center text-2xl text-white cursor-pointer">
                        ×
                      </div>
                    </a-tooltip>
                  </div>
                </div>
                <p class="text-xs lg:text-sm  py-0.5 text-gray-400"> {{ i.commentContent }}</p>

              </div>
            </div>

          </a-collapse-panel>
        </a-collapse>


      </template>


      <!--            <div v-if="showComment" class="relative w-full h-28 mt-2 text-right">-->
      <!--        <textarea v-model="commentIn"-->
      <!--                  class="bg-white border-2 border-gray-200 text-gray-400 w-full h-full text-xs rounded-xl resize-none outline-0 p-2"-->
      <!--                  placeholder="请输入内容... | Enter键发送"-->
      <!--                  @keyup.enter="saveComment()">-->
      <!--        </textarea>-->
      <!--                <div class="absolute bottom-1 right-1 space-x-1 flex justify-around items-center">-->
      <!--                    <button class="  button p-1  "-->
      <!--                            @click="saveComment()">-->
      <!--                        发送-->
      <!--                    </button>-->
      <!--                    <button class=" p-1  button"-->
      <!--                            @click="showComment =false">-->
      <!--                        取消-->
      <!--                    </button>-->
      <!--                </div>-->

      <!--            </div>-->
      <div
          v-if="logined"
          :class="{
            'opacity-100 translate-0': showComment,
            'invisible translate-x-full ': !showComment
               }"
          class="gs ti uf w-full flex justify-start transition duration-500 ">
        <div class="w-full ls ys abe mt-2">
          <div class="uk">
            <img class="lq nc re adn border border-indigo-600"
                 :src="$store.state.user.userProfilePhoto"
                 alt=""></div>
          <div class="tl uh">
            <div class="ab">
              <div class="focus-within:bg-white outline-0 adb ado bbi bbo bbs bca bgu bgz"><label for="comment" class="t">Add your
                comment</label>
                <textarea v-model="commentIn"
                          @keyup.enter.stop="saveComment()"
                           name="comment" id="comment"
                          class="p-2 lp focus-visible:outline-0 ti xo aev alh arl axq bfy bmx cht chv"
                          placeholder="添加评论..."></textarea>
                <div class="arq" aria-hidden="true">
                  <div class="asb">
                    <div class="od"></div>
                  </div>
                </div>
              </div>
              <div class="aa aj bx ls za arq ath flex justify-end atv">
                <button @click="showComment = false"
                        class="lt yu adp ajm ara arq avv awb bac bbi bin bot bou bow bpf">取消
                </button>
                <button @click="saveComment()"
                        class="lt yu adp ajm ara arq avv awb bac bbi bin bot bou bow bpf">发送
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </template>


  </div>
</template>

<script>
import {DeleteOutlined, CloseOutlined, EnterOutlined, LikeOutlined, MessageOutlined} from "@ant-design/icons-vue";
import user from "@/components/pub/user";

export default {
  name: "commentTemplate",
  props: ["comments", "method", "showCommentP", "receiverIdP"],
  components: {
    LikeOutlined,
    MessageOutlined,
    DeleteOutlined,
    EnterOutlined,
    user,
    CloseOutlined


  },
  data() {
    return {
      activeKey: 0,
      loading: true,
      submitting: false,
      showComment: false,
      commentParentId: -1,
      receiverId: -1,
      commentIn: '',
    };
  },

  computed:{
    logined() {
      return this.$store.state.user != null
    }
  },
  methods: {
    deleteComment(id) {
      this.$axios.delete('/comment/' + id).then(res => {
        if (res.data.code === 200) {
          // 将对应的评论从数组中删除
          for (let i = 0; i < this.comments.length; i++) {
            if (this.comments[i].commentId === id) {
              this.comments.splice(i, 1);
              break;
            }
          }
          for (let i = 0; i < this.comments.length; i++) {
            this.comments[i].value = this.comments[i].value.filter(item => item.commentId !== id);
          }
          // this.$st('删除成功', 'success')
        } else {
          this.$st('删除失败', 'error')
        }

      })
    },
    saveComment() {
      //输入框是否focus
      if (this.commentIn.trim() == "") {
        this.$st("评论内容不能为空", "error")
        this.commentIn = ""
        return
      }
      this.submitting = true
      this.$axios.post(this.baseURL + "/comment/add", {
        userId: this.$store.state.user.userId,
        articleId: this.$route.params.articleId,
        commentParentId: this.commentParentId,
        commentContent: this.commentIn,
        receiverId: this.receiverId
      }).then((res) => {
        if (res.data.code === 200) {
          // this.$st(res.data.data, 'success')
          this.commentIn = ""
          this.method()
          this.submitting = false
          this.showComment = false
        } else {
          this.$st(res.data.data, 'error')
        }
      })

    },
    commentClick(id, userId) {
      if (!this.checkLogin()) {
        return
      }
      this.showComment = !this.showComment
      this.commentParentId = id
      this.receiverId = userId
    },
    checkLogin() {
      if (this.$store.state.user == null) {
        this.$st('请先登录', 'error')
        return false
      }
      return true
    }


  },
  watch: {
    comments() {
      this.$nextTick(() => {
        this.loading = false
      })
    },
  },
  mounted() {
    // this.$st('双击文章标题可跳转文章页面', 'success')
  }
}

</script>

<style scoped>
:deep(.ant-list-vertical .ant-list-item-meta-title) {
  font-size: 14px;
}

:deep(.ant-list-vertical .ant-list-item-extra) {
  color: #8b8b8b;
}

:deep(p) {
  margin-bottom: 0;
}

span:hover {
  cursor: pointer;
  color: #111111;
  transition: all 0.3s;
}


</style>