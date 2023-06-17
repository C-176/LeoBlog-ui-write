<template>
  <bread>我的评论</bread>
  <MyCompostion :size="false">
    <div class="w-full  bg-gray-100 rounded-xl mx-auto">
      <comment-template :comments="comments"></comment-template>
    </div>
  </MyCompostion>
</template>

<script>
import commentTemplate from "@/components/pub/commentTemplate";
import MyCompostion from "@/components/pub/MyCompostion.vue";

export default {
  name: 'info-comments',
  components: {
    MyCompostion,
    commentTemplate
  },
  data() {
    return {
      comments: [{
        articleId: 82570593,
        articleTitle: "军队抽组卫勤力量 2000 余人支援上海疫情防控工作，对上海疫情防控有哪些积极作用？",
        commentId: 1,
        user: {
          userId: 1,
          userName: '评论者',
          userProfilePhoto: 'https://pic2.zhimg.com/v2-3b5a34f6a7e09d1b1f6f21400af9de2c_xl.jpg?source=32738c0c',
        },
        commentContent: '军队抽组卫勤力量 2000 余人支援上海疫情防控工作，对上海疫情防控有哪些积极作用？',
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
      }, {
        articleId: 82570593,
        articleTitle: "",
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
    this.$axios.get(this.baseURL + "/comment/list/user/" + this.$store.state.user.userId).then((res) => {
      if (res.data.code === 200) {
        this.comments = res.data.data
        this.comments.forEach((item) => {

          item.commentUpdateTime = this.$moments(item.commentUpdateTime)
          item.value.forEach((item3) => {
            item3.commentUpdateTime = this.$moments(item3.commentUpdateTime)
          })
        })

      }
    })
    this.$loading = false
  }
  ,
  computed: {},

}

</script>


<style scoped>
.whole {
  margin-left: calc(22.5%);
  margin-top: 60px;
  width: 55%;
  /*text-align: left;*/
  padding: 10px;

}


</style>