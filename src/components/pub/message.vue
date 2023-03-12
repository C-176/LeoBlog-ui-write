<template>
  <transition name="fade">

        <div v-show="$store.state.messageVisible" class="fixed text-left z-50 lg:inset-1  mx-auto lg:mt-16 w-full h-screen lg:w-2/3 lg:h-5/6 p-2 bg-white lg:rounded-xl">

      <a-tooltip id="close" class="absolute top-2 right-2 z-20" title="关闭">
        <button class="rounded-xl text-white h-8 w-8 text-center bg-indigo-600 hover:bg-indigo-500"
                @click="$store.commit('changeMessageVisible',!$store.state.messageVisible)">
          ✖
        </button>
      </a-tooltip>
      <el-empty v-if="messages.length===0" description="暂无消息">

      </el-empty>
      <template v-else>
<!--        <el-empty v-if="this.currentPage==1">-->
<!--        <a-button style="position: absolute;bottom: 10px;left: calc(50%)" shape="round" @click="getMessages">点击加载更多</a-button>-->

        <a-list :data-source="messages" class="messageBox" item-layout="horizontal">

          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta>
                <template #description>
                  <span v-html="item.messageContent"></span>
                </template>

                <template #title>
                  <a @click="$sa('别做梦了，航哥！','error')">{{ item.messageTitle }}</a>
                </template>
                <template #avatar>
<!--                  <user v-slot="slotP" :userId='item.userId' style="text-align: center">-->
                    <a-avatar
                        class="cursor-pointer"
                        @click="$sa('别做梦了，航哥！','error')"
                        src="https://tse4-mm.cn.bing.net/th/id/OIP-C.shEUS46R2nM0YPKHsqIE5AAAAA?w=182&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                        :style="{ backgroundColor: '#067061'  ,verticalAlign: 'middle'}"
                        shape="circle"
                        size="middle"
                    >


                    </a-avatar>
                    <!--                      {{ slotP.text }}-->
                    <div style="font-size: 12px;color: #7c929c">林思意</div>
<!--                  </user>-->
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </template>
    </div>
  </transition>
</template>

<script>
import {CloseOutlined, EnterOutlined} from '@ant-design/icons-vue';
import user from "@/components/pub/user";

export default {
  name: "message",
  components: {
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
          messageUpdateTime: '2022-12-06 00:00:00'
        }
      ],

    }
  },
  created() {
    this.logoSrc = this.baseURL + '/source/images/logoC.png'
    // this.getMessages()
  },
  methods: {
    getMessages() {
      this.currentPage++;
      if(this.currentPage>this.pages){
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}


</style>