<template>
  <div class="header invisible lg:visible">
    <div class="logo">
      <router-link to="/home/index">
        <img id="logo" :src="p(logoSrc)" alt="">
      </router-link>
    </div>
<!--    <a href="">-->
<!--      <router-link to="/home/index"><span class="iconfont">&#xe60f;</span>-->
<!--        首页-->
<!--      </router-link>-->
<!--    </a>-->
    <a>
      <router-link to="/home/article"><span class="iconfont">&#xe610;</span>
        文章
      </router-link>
    </a>
    <a>
      <router-link to="/home/picture"><span class="iconfont">&#xe8d3;</span> 图片</router-link>
    </a>
    <!--    <a>-->
    <!--      <router-link to="/home/about"><span class="iconfont">&#xe8d3;</span> 关于</router-link>-->
    <!--    </a>-->
    <a-dropdown>
      <a>
        <span class="iconfont">&#xe7e8;</span> 关于
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a><span class="iconfont">&#xe689;</span> 常见问题</a>
          </a-menu-item>
          <a-menu-item>
            <router-link to="/home/about/bigs"><span class="iconfont">&#xe65c;</span> 大事记</router-link>
          </a-menu-item>
          <a-menu-item>
            <router-link to="/home/about/bigs"><span class="iconfont">&#xeb7a;</span> 网站介绍</router-link>
          </a-menu-item>
          <a-menu-item>
            <router-link to="/home/about/team"><span class="iconfont">&#xe606;</span> 开发团队</router-link>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>

    <a-dropdown>
      <a>
        <span class="iconfont">&#xe695;</span> 视频
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
          <router-link to="/home/video/programmercarl.com"><span class="iconfont">&#xe65c;</span> 代码随想录
          </router-link>
        </a-menu-item>
          <a-menu-item>
            <router-link to="/home/video/pointerpointer.com"><span class="iconfont">&#xe669;</span> 找到你的鼠标
            </router-link>
          </a-menu-item>
          <a-menu-item>
            <router-link to="/home/video/cupfox.app"><span class="iconfont">&#xe694;</span> 茶杯狐</router-link>
          </a-menu-item>

        </a-menu>
      </template>
    </a-dropdown>

    <div @mouseleave="leave" class="search"
         @mouseover="inputStyle.padding='0 15px';inputStyle.width='200px'">
      <form action="javascript:void(0)">
<!--        <input class="searchInput" :style="inputStyle"-->
<!--               @input="inputStyle.padding='0 6px';inputStyle.width='200px'"-->
<!--               @mouseenter="inputStyle.padding='0 6px';inputStyle.width='200px'"-->
<!--               @blur="inputStyle.padding='0';inputStyle.width='0'"-->
<!--               type="text" autocomplete="off" placeholder="在此搜索..."-->
<!--               v-model="key">-->
        <input v-model="key" type="text" class="searchInput" autocomplete="off" placeholder="在此搜索..." style="padding: 0 15px; width: 200px" >
        <button class="searchImg"
                @click="search">
          <span class="iconfont">&#xe644;</span>
        </button>
      </form>
    </div>

    <div class="login"><a @click="logOut"><span class="iconfont">&#xe78c;</span> 退出</a></div>
    <div class="userPic">
      <el-dropdown trigger="hover" style="height: 40px;width: 40px;line-height: 40px">
        <a @click="this.$router.push('/back/info')">
          <!--          <img :src="p(user.userProfilePhoto)">-->
          <a-avatar
              :src="p(user.userProfilePhoto)"
              :style="{ backgroundColor: '#067061'  ,verticalAlign: 'middle'}"
              shape="circle"
              size="middle"
          >
            {{ user.userNickname }}
          </a-avatar>
        </a>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="this.$router.push('/back/info')"><span
                class="iconfont">&#xe647;</span>　个人信息
            </el-dropdown-item>
            <el-dropdown-item @click="this.$router.push('/back/articles')"><span
                class="iconfont">&#xe60c;</span>　文章
            </el-dropdown-item>
            <el-dropdown-item @click="this.$router.push('/back/scripts')"><span
                class="iconfont">&#xe733;</span>　草稿
            </el-dropdown-item>
            <el-dropdown-item @click="this.$router.push('/back/comments')"><span
                class="iconfont">&#xe648;</span>　评论
            </el-dropdown-item>
            <el-dropdown-item @click="this.$router.push('/back/pictures')"><span
                class="iconfont">&#xeb98;</span>　图片
            </el-dropdown-item>
            <el-dropdown-item @click="this.$router.push('/back/security')"><span
                class="iconfont">&#xec4d;</span>　安全
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <div class="msg">
      <a-tooltip placement="bottom">
        <template #title>消息</template>
        <a-badge :count="$store.state.messagePoint">
          <a @click="$store.commit('changeMessageVisible',!$store.state.messageVisible)"><span
              class="iconfont">&#xe607;</span></a>
        </a-badge>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>私信</template>
        <a-badge :count="$store.state.chatPoint">
          <a @click="$store.commit('changeChatVisible',!$store.state.chatVisible)"><span
              class="iconfont">&#xe6ff;</span></a>
        </a-badge>
      </a-tooltip>

    </div>
    <!--    <music></music>-->

    <!--    <a-switch v-model:checked="checked2" style="float: right;margin-top: 14px;margin-right: 10px;background: #117a8b"-->
    <!--              @change="$store.commit('changeMode')" checked-children="暗" un-checked-children="明"/>-->
  </div>
  <chat></chat>
  <message></message>
  <BgCover :showCover.sync="$store.state.chatVisible || $store.state.messageVisible"></BgCover>

</template>

<script>


import Swal from "sweetalert2";
import {mapMutations, mapState} from "vuex";
import BgCover from "@/components/pub/BgCover";
import chat from "@/components/pub/chat";
import message from "@/components/pub/message";
import music from "@/components/pub/music";


export default {
  name: 'h',
  components: {chat, BgCover, message, music},
  data() {
    return {


      logoSrc: '',
      checked2: false,
      inputStyle: {
        padding: '0',
        width: '0',
        transition: 'all 0.5s'
      },
      key: '',


    }
  },
  computed: {
    ...mapState(['user']),
    ...mapMutations(['removeToken',])
  },
  mounted() {
    this.logoSrc = this.baseURL + '/source/images/logo.png'


  },
  methods: {
    search() {
      if (this.key.trim() === '') {
        this.$st('无效搜索关键字', 'warning')
      } else {
        this.inputStyle.padding = '0';
        this.inputStyle.width = '0'
        this.$router.push('/search/' + this.key.trim() + '?time=' + new Date().getTime())
      }
    },

    leave() {
      if (this.key.trim() !== '') {
        this.inputStyle.width = '200px';
        this.inputStyle.padding = '0 6px';
      } else {
        this.inputStyle.width = '0px';
        this.inputStyle.padding = '0';
      }

    },
    logOut() {
      //选择框
      Swal.fire({
        title: '确定退出吗?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.value) {
          // this.$store.commit('removeToken')
          localStorage.removeItem('user')
          this.$router.push('/index');
        }
      })
    }
  }

}

</script>


<style scoped>
.userPic {
  float: right;
  height: 40px;
  width: 40px;
  margin-top: 5px;
  border-radius: 20px;
  line-height: 40px;
}

:deep(.el-dropdown-menu__item:not(.is-disabled):focus) {
  background-color: #ecf0f2;
  color: #111;
}

.userPic img {
  height: 100%;
  width: 100%;
  border-radius: 30px;
}

.search {
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fdfdfd;
  height: 30px;
  border-radius: 30px;
  line-height: 26px;
  border: 2px solid #8e9192;
  /*border-top: 2px solid #8e9192;*/
  /*border-bottom: 2px solid #8e9192;*/
  /*border-right: 0px solid #8e9192;*/

}

.searchInput {
  width: 200px;
  padding: 0 10px;
}

.search:hover {
  /*background-color: #869d9d;*/
}

.searchInput {
  border: none;
  background: none;
  /* 取消选中搜索框时的外边框 */
  outline: none;
  width: 0px;
  /* padding-left: 10px; */
  /* margin-left: 10px; */
  transition: .3s all ease;
  line-height: 26px;
  font-size: 14px;
  /*color: #ffffff;*/
  height: 26px;
}

.searchImg {
  outline: none;
  position: relative;
  color: #d8e3e7;
  float: right;
  /* padding-right: 10px; */
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: #fdfdfd;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .2s;
  /* right: 10px; */
  border: 0px solid #8e9192;
}

.searchImg span {
  font-size: 25px;
  color: #134857;
  font-weight: 600;
}


.searchImg:hover {
  cursor: pointer;
  background-color: #ecf0f3;
}

.header {
  position: fixed;
  top: 0;
  z-index: 70;
  width: 100%;
  margin: 0 auto;
  height: 50px;
  background: #eef2f4;
  line-height: 50px;
  border-bottom: 1px solid #8fa5a5;
}

.msg a:hover {
  color: #859c9c;

}


.logo {
  width: 100px;
  height: 50px;
  /*margin-left: 35px;*/
  float: left;
  margin: 0 20px;
  /*color: #132c33;*/
  /*font-size: 35px;*/
  transition: width 0.5s;
  /*line-height: 50px;*/
}

#logo {
  width: 120%;
  height: 120%;
  border-width: 0;
  margin-top: -5px;
}

.header > a {
  margin: 10px 0;
  color: #111111;
  float: left;
  /*  height: 50px;*/
  font-size: 13px;
  transition: all 0.5s;
  font-weight: 400;

  height: 30px;
  width: 6%;
  line-height: 30px;
  border-radius: 5px;
}

.header > a:hover {
  /*margin: 0 20px;*/
  transition: all 0.5s;
  color: #111 !important;
  background: #fff;
}

.header > a > span {
  font-size: 16px;
  line-height: 30px;
}


.header .msg {
  float: right;
  height: 30px;
  width: 80px;
  right: 120px;
  margin-top: 10px;
}

.msg a {
  color: #111111;
  float: left;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 22px;
}

.login {
  float: right;
  height: 30px;
  width: 65px;
  border-radius: 5px;
  font-size: 16px;
  line-height: 30px;
  margin: 10px 10px 0 10px;
  /*padding: 10px 0 0 0 ;*/
  transition: background-color 0.3s;
}

.login:hover {
  background: #fff;

}

.login a {
  text-decoration: none;
  color: #111111;
  font-size: 16px;
  font-weight: 600;
  transition: all .3s;
}

.login a:hover {

}

:deep(.ant-dropdown-menu-title-content > a) {
  font-size: 12px !important;
}
</style>
