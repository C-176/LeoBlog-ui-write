<template>
  <transition name="fade">
    <div v-show="$store.state.messageVisible" class="whole">
      <div class="logo">
        <img id="logo" :src="logoSrc" alt="">
        <!--      <span>消息盒子</span>-->

      </div>
      <a-tooltip id="close" style="position: fixed;top: 100px;right: 10px" title="关闭">
        <a-button shape="circle" size="large" style="position: absolute;top: 10px;right: 10px"
                  type="dashed"
                  @click="$store.commit('changeMessageVisible',!$store.state.messageVisible)">
          <template #icon>
            <close-outlined/>
          </template>
        </a-button>
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
                  <a href="javascript:void(0)">{{ item.messageTitle }}</a>
                </template>
                <template #avatar>
                  <user v-slot="slotP" :userId='item.userId' style="text-align: center">
                    <a-avatar
                        :src="p(slotP.photo)"
                        :style="{ backgroundColor: '#067061'  ,verticalAlign: 'middle'}"
                        shape="circle"
                        size="middle"
                    >
                      {{ slotP.text }}
                    </a-avatar>
                    <div style="font-size: 12px;color: #7c929c">{{ slotP.text }}</div>
                  </user>
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
        // {
        //   userId: 1,
        //   messageTitle: '消息标题',
        //   messageContent: '消息内容',
        //   messageUpdateTime: '2021-01-01 00:00:00'
        // }
      ],

    }
  },
  created() {
    this.logoSrc = this.baseURL + '/source/images/logoC.png'
    this.getMessages()
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

.whole {
  z-index: 110 !important;
  position: fixed;
  top: 60px;
  background: #fff;
  height: 600px !important;
  width: 65%;
  border-radius: 10px !important;
  /*margin-top: 60px;*/
  margin-left: calc(17.5%) !important;
  text-align: left;

}


.logo::before {
  display: inline-block;
  content: "";
  height: 100%;
  vertical-align: middle;
}

.logo {
  width: 20%;
  height: 8%;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  padding-left: 30px;
}

/*.logo {*/
/*  width: 100px;*/
/*  height: 50px;*/
/*  !*margin-left: 35px;*!*/
/*  float: left;*/
/*  margin-left: 35px;*/
/*  !*color: #132c33;*!*/
/*  !*font-size: 35px;*!*/
/*  transition: width 0.5s;*/
/*  !*line-height: 50px;*!*/
/*}*/
#logo {
  width: 100%;
  height: 100%;

}

.messageBox {
  margin-top: 20px;
  margin-left: 30px;
  width: 90%;
  height: 90%;
  overflow: auto;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}


</style>