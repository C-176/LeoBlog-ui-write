<template>
  <div class="w-full  bg-white  text-left">
    <template v-if="loading">
      <a-skeleton active/>
      <a-skeleton active/>
      <a-skeleton active/>
    </template>

    <template v-else>
      <el-empty v-if="comments.length===0">
        <template #description>
          暂无评论，快去发表你的评论吧
        </template>
      </el-empty>
      <a-list v-else :data-source="comments" item-layout="vertical" size="small">
        <template #renderItem="{item}">
          <template v-if="item.articleTitle.trim() != ''">
            <a class="text-base my-2 block" @click="$router.push('/article/'+item.articleId)"><span
                v-html="item.articleTitle"></span></a>
          </template>
          <a-list-item :key="item.commentId" :extra="item.commentUpdateTime">
            <template #actions>
            <span>
              <component is="LikeOutlined" style="margin-right: 0px"/>
              {{ item.commentLikes }}
            </span>
              <span v-if="item.articleTitle.trim() ==''" class="reply1"
                    @click="commentClick(item.commentId,item.userId)">
              <component is="MessageOutlined" style="margin-right: 0px"/>
            </span>
              <span v-if="item.user.userId == $store.state.user.userId" @click="deleteComment(item.commentId)">
              <component is="DeleteOutlined" style="margin-right: 0px"/>
            </span>
            </template>

            <a-list-item-meta :description="item.commentContent" :title="item.user.userNickname">
              {{ item.commentUpdateTime }}

              <template #avatar>
                <user :user="item.user">
                  <a-avatar :src="p(item.user.userProfilePhoto)"
                            :style="{backgroundColor:'#0eb73a'}"
                            size="middle">
                    {{ item.user.userNickname }}
                  </a-avatar>
                </user>
              </template>
            </a-list-item-meta>
          </a-list-item>

          <a-list v-for=" i in item.value" item-layout="vertical" size="small">

            <a-list-item :key="i.commentId"  class="ml-10">
              <template #actions>
                  <span>
                    <component is="LikeOutlined" style="margin-right: 0px"/>
                    {{ i.commentLikes }}
                  </span>
                <span v-if="item.articleTitle.trim() ==''" class="reply1"
                      @click="commentClick(item.commentId,i.userId)">
                    <component is="MessageOutlined" style="margin-right: 0px"/>
                  </span>
                <span v-if="i.user.userId == $store.state.user.userId" @click="deleteComment(i.commentId)">
                    <component is="DeleteOutlined" style="margin-right: 0px"/>
                  </span>
              </template>

              <a-list-item-meta :description="i.commentContent" :title="i.user.userNickname">
                <template #avatar>
                  <user :user="i.user">
                    <a-avatar :src="p(i.user.userProfilePhoto)"
                              :style="{backgroundColor:'#067061'}"
                              size="middle">
                      {{ i.user.userNickname }}
                    </a-avatar>
                  </user>
                </template>
              </a-list-item-meta>

            </a-list-item>

          </a-list>
        </template>

      </a-list>
      <!--      <template v-if="showComment">-->
      <!--        <el-affix :offset="20" position="bottom">-->
      <!--          <textarea v-model="commentIn" class="commentIn" placeholder="请输入内容"-->
      <!--                    @keyup.enter="saveComment()">-->
      <!--          </textarea>-->
      <!--          <a-button id="enter" :loading="submitting" ghost shape="round" size="small"-->
      <!--                    type="primary" @click="saveComment()">-->
      <!--            &lt;!&ndash;            <template #icon>&ndash;&gt;-->
      <!--            <enter-outlined/>-->
      <!--            发送-->
      <!--            &lt;!&ndash;            </template>&ndash;&gt;-->
      <!--          </a-button>-->

      <!--        </el-affix>-->
      <!--      </template>-->

      <div v-if="showComment" class="relative w-full h-28 text-right">
        <el-affix :offset="5" class="h-full" position="bottom">
                    <textarea v-model="commentIn"
                              class="bg-white border-2 border-gray-200 w-full h-full rounded-xl resize-none outline-0 p-2"
                              placeholder="请输入内容... | Enter键发送"
                              @keyup.enter="saveComment()">
                    </textarea>
          <a-button :loading="submitting" class="absolute  hover:text-black right-2 -top-8  text-gray-400"
                    shape="round" size="small"
                    @click="saveComment()">
            <enter-outlined/>
<!--            发送-->
          </a-button>
          <a-button :loading="submitting" class="absolute   hover:text-black right-0.5 -top-8  text-gray-400"
                    shape="round" size="small"
                    @click="showComment =false">
            <close-outlined/>

          </a-button>
        </el-affix>
      </div>


    </template>


  </div>
</template>

<script>
import {DeleteOutlined,CloseOutlined, EnterOutlined, LikeOutlined, MessageOutlined} from "@ant-design/icons-vue";
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
      this.showComment = !this.showComment
      this.commentParentId = id
      this.receiverId = userId
    },


  },
  watch: {
    comments() {
      this.$nextTick(() => {
        this.loading = false
      })
    },
  }
}

</script>

<style scoped>

#enter {
  color: #7c929c;
  border-color: #7c929c;
  position: absolute;
  margin-left: -100px;
  margin-top: calc(7%);
}

#enter:hover {
  background: rgba(124, 146, 156, 0.68);
}

:deep(.ant-list-vertical .ant-list-item-meta-title) {
  font-size: 14px;
}

:deep(.ant-list-vertical .ant-list-item-extra) {
  color: #8b8b8b;
}


span:hover {
  cursor: pointer;
  color: #111111;
  transition: all 0.3s;
}


</style>