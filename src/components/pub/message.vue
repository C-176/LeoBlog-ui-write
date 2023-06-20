<template>
  <!--  <my-modal :visible="$store.state.messageVisible" size="md" @closeModal="closeMessage">-->
  <el-empty v-if="messages.length===0" description="暂无消息"/>
  <template v-else>

    <div class="gs tx bg-white py-1 overscroll-contain overflow-y-scroll max-h-1/2">
      <ul role="list" class="flex-col justify-center items-center space-y-1">
        <li class="arx p-2 cursor-pointer hover:bg-gray-100 transition  duration-300 rounded-xl"
            v-for="item in messages" @click="checkout(item)">
          <div class="ls yu aaa justify-between">
            <avatar :user-id="item.userId">

              <user :user-id="item.userId" v-slot="userP">
                <div class="flex justify-start items-center space-x-1.5">
                  <a class="relative block nx rz uj adn air">

                    <img :src="userP.photo"
                         alt="" class="nx rz uj adn air">
                    <span
                        class="absolute bg-red-500 w-3 h-3 transform -translate-x-1/4  border-2 border-white rounded-full left-1/2 -top-2"
                        :class="{'hidden':item.isSaw !== 0}">
                                      </span>
                  </a>
                  <h3 class="ui adg avv awb awk axq">{{ userP.text }}</h3></div>
              </user>
            </avatar>
            <time datetime="2023-01-23T11:00" class="uj avx axm">{{ this.$simpleFormat(item.messageUpdateTime) }}</time>
          </div>
          <p class="la adg avv axm">{{ item.messageTitle }}</p></li>

      </ul>
    </div>


    <!--        <el-empty v-if="this.currentPage==1">-->
    <!--        <a-button style="position: absolute;bottom: 10px;left: calc(50%)" shape="round" @click="getMessages">点击加载更多</a-button>-->

    <!--      <a-list :data-source="messages" class="messageBox" item-layout="horizontal">-->

    <!--        <template #renderItem="{ item }">-->
    <!--          <a-list-item>-->
    <!--            <a-list-item-meta>-->
    <!--              <template #description>-->
    <!--                <span v-html="item.messageContent"></span>-->
    <!--              </template>-->

    <!--              <template #title>-->
    <!--                <div class="w-full h-full flex justify-between items-center">-->
    <!--                  <div @click="()=>{this.$router.push(`${item.messageRedirect}`)}">-->
    <!--                    {{ item.messageTitle }}-->
    <!--                  </div>-->
    <!--                  <div class="text-gray-400">{{ this.$moments(item.messageUpdateTime,'M-D h:m') }}</div>-->
    <!--                </div>-->
    <!--              </template>-->
    <!--              <template #avatar>-->
    <!--                <avatar :user-id="item.userId">-->
    <!--                <user :user-id="item.userId" v-slot="userP">-->
    <!--                  <a class="relative block">-->

    <!--                    <img alt="profile" :src="userP.photo"-->
    <!--                         class="mx-auto object-cover rounded-full h-10 w-10 "/>-->
    <!--                    <span-->
    <!--                        class="absolute bg-red-500 w-3 h-3 transform -translate-x-1/4  border-2 border-white rounded-full left-1/2 -top-2"-->
    <!--                        :class="{'hidden':item.isSaw !== 0}">-->
    <!--                        </span>-->
    <!--                  </a></user>-->
    <!--                </avatar>-->
    <!--              </template>-->
    <!--            </a-list-item-meta>-->
    <!--          </a-list-item>-->
    <!--        </template>-->
    <!--      </a-list>-->
  </template>
  <!--  </my-modal>-->
</template>

<script>
import {CloseOutlined, EnterOutlined} from '@ant-design/icons-vue';
import user from "@/components/pub/user";
import MyModal from "@/components/pub/myModal.vue";

export default {
  name: "message",
  components: {
    MyModal,
    CloseOutlined,
    EnterOutlined,
    user
  },
  data() {
    return {
      currentPage: 0,
      pages: 1,
      pageSize: 10,
      logoSrc: '',
      messages: [
        {
          userId: 1,
          messageTitle: '向你发来一条心动消息',
          messageContent: '听人说，你也喜欢我，你能做我男朋友吗...',
          messageRedirect: 'https://www.baidu.com',
          messageUpdateTime: '2022-12-06 00:00:00',
          messageType: 1,
          isSaw: 1,
        }
      ],
      offset: 0,
      lastScore: null,

    }
  },
  created() {
    this.logoSrc = this.baseURL + '/source/images/logoC.png'
    // this.getMessages()
    this.getScrollMsgs()
  },
  methods: {
    closeMessage() {
      this.$store.commit('changeMessageVisible', false)
    },
    getScrollMsgs() {
      if (this.lastScore == null) {
        this.lastScore = new Date().getTime();
        this.messages = []
      }

      this.$axios.get(`\/message/${this.offset}/${this.lastScore}`).then(res => {
        if (res.data.code === 200) {
          let msgs = res.data.data.messages;
          if (msgs.length === 0) {
            this.lastScore = null
            this.offset = 0
            return;
          }
          this.offset = res.data.data.offset;
          this.lastScore = res.data.data.lastScore;
          this.messages = this.messages.concat(msgs);

        } else {
          this.$st(res.data.data, 'error')
        }
      })

    },
    checkout(msg) {
      var type = msg.messageType;
      var redirect = msg.messageRedirect;
      // :0-发表文章 1-评论文章 2-收藏文章 3-点赞文章
//     * 4-关注用户 5-回复评论 6-系统消息
      switch (type) {
        case 0:
          this.$router.push(`/article/${redirect}`)
          break;
        case 1:
          this.$router.push(`/article/${redirect}`)
          break;
        case 2:
          this.$router.push(`/article/${redirect}`)
          break;
        case 3:
          this.$router.push(`/article/${redirect}`)
          break;
        case 4:
          this.$router.push(`/user/${redirect}`)
          break;
        case 5:
          this.$router.push(`/article/${redirect}`)
          break;
        case 6:
          // this.$router.push(`/article/${redirect}`)
          this.$st(redirect, 'info')
          break;
      }
      this.$store.commit('changeMessageVisible', false)


    },

    getMessages() {
      this.currentPage++;
      if (this.currentPage > this.pages) {
        this.$st.info('没有更多消息了')
      }
      this.$axios.get('/message/user/' + this.$store.state.user.userId + '/' + this.currentPage + '/' + this.pageSize).then(res => {
        if (res.data.code === 200) {
          this.currentPage = res.data.data.current;
          this.pages = res.data.data.pages;
          this.messages = this.messages.concat(res.data.data.records);
        } else {
          this.$st(res.data.data, 'error')
        }
      })

    }
  }
}
</script>

<style scoped>

</style>