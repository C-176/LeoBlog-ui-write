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
                    <a-tooltip>
                      <template #title>删除</template>
                      <div
                          v-if="comment.user.userId == $store.state.user.userId"
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
                    <a-tooltip>
                      <template #title>删除</template>
                      <div
                          v-if="i.user.userId == $store.state.user.userId"
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
      <div  v-if="showComment" class="gs ti uf">
        <div class="ls ys abe">
          <div class="uk"><img class="lq nc re adn"
                               src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                               alt=""></div>
          <div class="tl uh">
            <form action="#" class="ab">
              <div class="adb ado bbi bbo bbs bca bgu bgz"><label for="comment" class="t">Add your
                comment</label><textarea rows="3" name="comment" id="comment"
                                         class="lp ti xo aev alh arl axq bfy bmx cht chv"
                                         placeholder="Add your comment..."></textarea>
                <div class="arq" aria-hidden="true">
                  <div class="asb">
                    <div class="od"></div>
                  </div>
                </div>
              </div>
              <div class="aa aj bx ls za arq ath atv">
                <div class="ls yu abf">
                  <div class="ls yu">
                    <button type="button" class="fo ls nc re yu yz adn axk bks">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                           class="nu rw">
                        <path fill-rule="evenodd"
                              d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                              clip-rule="evenodd"></path>
                      </svg>
                      <span class="t">Attach a file</span></button>
                  </div>
                  <div class="ls yu"><label class="t" id="headlessui-listbox-label-1" data-headlessui-state="">Your
                    mood</label>
                    <div class="ab">
                      <button class="ab fo ls nc re yu yz adn axk bks" id="headlessui-listbox-button-2" type="button"
                              aria-haspopup="listbox" aria-expanded="false" data-headlessui-state=""
                              aria-labelledby="headlessui-listbox-label-1 headlessui-listbox-button-2"><span
                          class="ls yu yz"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                      fill="currentColor" aria-hidden="true" class="nu rw uk"><path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.536-4.464a.75.75 0 10-1.061-1.061 3.5 3.5 0 01-4.95 0 .75.75 0 00-1.06 1.06 5 5 0 007.07 0zM9 8.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S7.448 7 8 7s1 .672 1 1.5zm3 1.5c.552 0 1-.672 1-1.5S12.552 7 12 7s-1 .672-1 1.5.448 1.5 1 1.5z"
                          clip-rule="evenodd"></path></svg><span class="t">Add your mood</span></span></span></button>
                    </div>
                  </div>
                </div>
                <div class="uk">
                  <button type="submit" class="lt yu adp ajm ara arq avv awb bac bbi bin bot bou bow bpf">Post</button>
                </div>
              </div>
            </form>
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
          this.$st('删除成功', 'success')
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
          this.$st(res.data.data, 'success')
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