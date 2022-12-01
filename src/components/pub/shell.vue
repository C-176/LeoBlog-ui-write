<template>
  <div class="shell" v-if="$store.state.shell">
    <router-link to="/back/info"><a class="box"><i class="iconfont"><span
        class="iconfont">&#xe647;</span></i><span>个人信息  </span></a></router-link>
    <router-link to="/back/articles"><a class="box" ><i
        class="iconfont "><span class="iconfont">&#xe60c;</span></i><span> 文章</span></a></router-link>
    <router-link to="/back/scripts"><a class="box"><i class="iconfont"><span
        class="iconfont">&#xe733;</span></i><span>草稿</span></a></router-link>
    <router-link to="/back/comments"><a class="box" ><i class="iconfont"><span
        class="iconfont">&#xe648;</span></i><span>评论</span></a></router-link>
    <router-link to="/back/pictures"><a class="box" ><i class="iconfont"><span
        class="iconfont">&#xeb98;</span></i><span>图片</span></a></router-link>
    <router-link to="/back/security"><a class="box" ><i class="iconfont"><span class="iconfont">&#xec4d;</span></i><span>安全</span></a></router-link>
    <router-link to="/back/backControl"><a class="box" href="#"><i class="iconfont"><span class="iconfont">&#xe62d;</span></i><span>后台管理</span></a></router-link>
  </div>


</template>

<script>

export default{
  name:'shell',
  data(){
    return{

    }
  }
}

</script>

<style scoped>
.shell {
  z-index: 80;
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  /*align-items: center;*/
  flex-direction: column;
  background-color: #fdfdfd;
  /* border-radius: 10px; */
  transition: .3s;
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 50px;
  /*z-index: 1;*/
  text-align: left;
}

.box {
  display: block;
  height: 50px;
  width: 100%;
  margin: 2px;
  border-radius: 5px;
  position: relative;
  transition: .3s;
  color: #111111;
  line-height: 50px;
}

.box i {
  font-size: 30px;
  display: block;
  width: 45px;
  height: 45px;
  position: absolute;
  text-align: center;
  /*margin: 0px 0 0 0px;*/
}

/*.box:nth-child(1)::before {*/
/*  content: '';*/
/*  display: block;*/
/*  width: 100%;*/
/*  height: 2px;*/
/*  background-color: #869d9d;*/
/*  position: absolute;*/
/*  bottom: -5px;*/
/*}*/

.box > span {
  position: relative;
  top: 0px;
  left: 50px;
  font: 500 14px '';
  opacity: 0;
  transition: .1s;
  line-height: 50px;
  font-weight: 600;
}

.box i > span {
  font-size: 30px;
  line-height: 45px;
}

.shell:hover {
  width: 120px;
}

.box:hover {
  background-color: #ecf0f2;
  /*border: 2px dashed #869d9d;*/
  /*margin: 0;*/
}

.shell:hover span {
  opacity: 1;
}

.box:hover {
  /*color: #1d1d26;*/
}
</style>