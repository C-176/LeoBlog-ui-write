<template>
  <div class="w-1/4 overscroll-contain bg-gray-50 overflow-y-auto  rounded-xl pb-20 fixed flex-col justify-start items-center space-y-2">

    <a class="block text-right hover:text-gray-500  text-sm h-5 w-full" @click="$router.push('/back/scripts')">
      <!--      <span class="iconfont">&#xe823;</span> 创作中心-->
      <span class="iconfont">&#xe7c4;</span>草稿箱 ({{ scriptSize }})
    </a>
    <div class=" bg-gray-100 w-full h-24 p-2 flex justify-between rounded-xl">
      <div class="w-2/5 w-auto rounded-xl justify-self-center mx-2 float-left overflow-hidden">
        <a-avatar
            id="profilePhoto"
            :src="p(user.userProfilePhoto)"
            :style="{ backgroundColor: '#067061'  ,verticalAlign: 'middle' }"
            shape="square"
            size="middle"
        >
          {{ user.userNickname }}
        </a-avatar>
      </div>
      <div class="intro text-center w-2/3">
        <div class="text-base my-1.5 font-bold"><span class="iconfont">&#xe6b3;</span>
          {{ user.userNickname }}
        </div>
        <div class="intro1 text-sm"><span class="iconfont">&#xe78b;</span>
          {{ user.userIntro }}
        </div>
      </div>
    </div>

    <div class="w-full px-5 py-3 h-20 flex justify-between items-center">
      <div @click="$router.push('/back/articles')"
           class="h-full hover:cursor-pointer w-2/5 text-sm  p-2 align-middle rounded-xl bg-white"><span
          class="iconfont">&#xe610;</span>
        文章 <h3> {{ articleSize }}</h3></div>
      <div @click="$router.push('/back/comments')"
          class="h-full  hover:cursor-pointer w-2/5 text-sm p-2 rounded-xl bg-white"><span
          class="iconfont">&#xe654;</span>
        评论 <h3>{{ commentSize }}</h3></div>
    </div>
    <div class="w-full h-12 text-center font-bold text-sm border-t py-2">
      <span class="iconfont">&#xe6db;</span>今日话题: <br>{{ hotTopic }}
    </div>
    <div class="rounded-xl bg-gray-200 w-1/2 text-center text font-medium mx-auto h-8 my-2 flex items-center justify-center">
      <a  @click="$router.push('/write/0')">开始创作 <span class="iconfont">&#xe823;</span></a>
    </div>

  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'rightSelf',
  data() {
    return {
      articleSize: 0,
      commentSize: 0,
      scriptSize: 0,
      hotTopic: '今天天气不错',
    }
  },
  created() {
    this.$axios.get('/article/sum/user/' + this.user.userId).then(res => {
      this.articleSize = res.data.data.articleSize;
      this.scriptSize = res.data.data.scriptSize;
      this.commentSize = res.data.data.commentSize;
    });
  },
  watch: {
    user() {

    }
  },
  methods: {}, computed: {
    ...mapState(['user'])
  }
}

</script>

<style scoped>
.rightSelf {
  background: #fff;
  height: auto;
  border-radius: 5px;
  position: fixed;
  float: right;
  top: 60px;
  width: 17%;
  left: calc(69% + 3px);
}


.rightSelf .script {

  width: 100%;
  height: 20px;
  padding: 0 5px;
  position: relative;
  line-height: 20px;
  font-size: 12px;
  /*font-weight: 600;*/
  display: block;
  text-align: right;
  /*color: #9ca29d;*/
}


.rightSelf .user {
  height: 105px;
  width: 100%;
  padding: 10px;
  background-color: #d8e3e763;
  overflow: hidden;
}

.user .img {

  height: 85px;

  width: 85px;

  border-radius: 5px;

  float: left;

  margin-right: 15px;
  overflow: hidden;
}

#profilePhoto {
  width: 100%;
  height: 100%;
  /*backgorund-size: 100% 100%;*/
  vertical-align: middle;
  /*border-style: none;*/
}

.intro {
  float: left;
  /*width: 60%;*/
  height: 105px;
  line-height: 40px;
  text-align: left;
}

.intro .name {
  height: 20px;
  width: 100%;
  color: #134857;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
}

.intro .intro1 {
  padding-bottom: 5px;
  height: 75px;
  width: 100%;
  color: #134857;
  font-size: 12px;
  line-height: 20px;
  text-align: left;
  overflow: hidden;
  -webkit-mask-image: -webkit-linear-gradient(bottom, rgba(0, 0, 0, 0) 5%, rgb(18, 71, 85) 30%);
}

.read {
  height: 80px;
  width: 100%;
  font-size: 14px;
  padding: 10px;
  line-height: 30px;
}

.news {
  height: auto;
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  padding: 10px;
  line-height: 25px;
  border-top: 1px solid #8590a661;
}

.go {
  margin: 10px auto 20px;
  width: 50%;
  height: 40px;
  line-height: 40px;
  background-color: #eef2f4;
  border-radius: 10px;
  outline: none;
  position: relative;

}

.go:hover {
  cursor: pointer;
}

.go::before {
  content: '';
  z-index: -1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 2px solid rgba(134, 157, 157, 0.19);
  transform-origin: center;
  transform: scale(1);
  border-radius: 10px;
}

.go:hover::before {
  transition: all 0.75s ease-in-out;
  transform-origin: center;
  transform: scale(1.75);
  opacity: 0;
}

.go a {
  display: block;
  height: 100%;
  width: 100%;
  color: #134857;
  font-size: 1vw;
  font-weight: 600;
  border-radius: 10px;
}

.rightSelf .script a:hover {
  transition: all .2s;
}

.read .artSum, .read .comSum {
  height: 100%;
  width: 40%;
  font-size: 14px;
  color: #134857;
  border-radius: 10px;
  background: #f0f4f6;
  line-height: 30px;
  margin: 0 5%;
}

.artSum {
  float: left;
}

.comSum {
  float: right;
}

.read .artSum:hover, .read .comSum:hover {
  background: #eef2f4;
  cursor: pointer;
}
</style>