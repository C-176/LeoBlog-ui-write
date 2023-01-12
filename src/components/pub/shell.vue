<template>
  <div class="shell invisible md:visible" v-if="$store.state.shell">
    <a class="box" v-for="item in pages" :key="item.name"
       @click="item.href($router)">
      <i class="h-full flex items-center">
        <icon :src="item.iconSrc"></icon>
      </i>

      <span>{{ item.name }}  </span></a>
  </div>


</template>

<script>

export default {
  name: 'shell',
  data() {
    return {
      pages: [
        {
          name: '个人中心', href: function ($router) {

            $router.push('/back/info')
          }, iconSrc: 'bhfjfgqz'
        },
        {
          name: '我的文章', href: function ($router) {

            $router.push('/back/articles')
          }, iconSrc: 'vufjamqa'
        },
        {
          name: '我的草稿', href: function ($router) {

            $router.push('/back/scripts')
          }, iconSrc: 'nocovwne'
        },
        {
          name: '评论中心', href: function ($router) {

            $router.push('/back/comments')
          }, iconSrc: 'hpivxauj'
        },
        {
          name: '安全中心', href: function ($router) {

            $router.push('/back/security')
          }, iconSrc: 'huwchbks'
        }
      ]
    }
  }
}

</script>

<style scoped>
.shell {
  z-index: 30;
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