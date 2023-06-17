<template>
  <bread>工程进度</bread>
  <MyCompostion>
    <div class="mx-auto w-full relative bg-white  mb-2">

      <div>
        <el-steps direction="vertical" :active="stepIndex" space="100px" style="color:#111">
          <el-step v-for="(step,index) in steps"
                   :title="step.title"
                   :description="step.desc"/>
        </el-steps>
      </div>
    </div>
  </MyCompostion>
</template>


<script>


import {ArrowRight} from '@element-plus/icons-vue'
import Bread from "@/components/pub/bread";
import MyCompostion from "@/components/pub/MyCompostion.vue";

export default {
  name: "about",
  components: {
    MyCompostion,
    Bread,
    ArrowRight
  },
  data() {
    return {
      stepIndex: 0,
      steps: [
        {
          title: '2022-10-01',
          desc: '初步搭建项目，首先完成非前后端分离版本'
        },
        {
          title: "2022-10-03",
          desc: "实现前后端分离，使用vue-cli搭建前端项目，使用springboot搭建后端项目"
        },
        {
          title: "2022-10-05",
          desc: "实现登陆与登出功能，利用携带token实现登陆注册功能"
        },
        {
          title: "2022-10-08",
          desc: "增加轮播图效果，增加首页的动态效果"
        },

        {
          title: '2022-10-14',
          desc: '新增文章相关功能，包括文章的增删改查，以及文章的评论、点赞、收藏等功能'
        },
        {
          title: '2022-10-14',
          desc: '新增草稿相关功能，包括草稿的增删改查'
        },
        {
          title: '2022-10-17',
          desc: '新增聊天室相关功能，包括聊天对象列表的获取、聊天记录的获取、聊天内容的发送等功能'
        },
        {
          title: '2022-10-19',
          desc: '新增用户相关功能，包括用户的修改个人信息等功能'
        },
        {
          title: '2022-10-20',
          desc: '新增图片查看页面，不包括图片上传功能'
        },
        {
          title: '2022-10-24',
          desc: '优化UI界面，增加返回顶部功能'
        },
        {
          title: '2022-10-25',
          desc: '更换Logo，增加关于页面'
        },
        {
          title: '2022-10-26',
          desc: '增加文章搜索功能(标签、分类、标题、内容)，标签和分类过滤稍复杂一些。'
        },
        {
          title: '2022-10-27',
          desc: '增加消息页面'
        }


      ]
    }
  },
  created() {
    this.stepIndex = this.steps.length - 3
  },

}
</script>

<style scoped>

:deep(.is-finish) {
  /*color: #0cba39 !important;*/
  /*border-color: #0cba39 !important;*/
  color: #111 !important;
  border-color: #111 !important;
}


</style>