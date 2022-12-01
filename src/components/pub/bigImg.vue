<template>

  <div class="showPhoto" v-show="visible">
    <el-image
        class="img"
        :src="url"
        fit="cover"
        @close="closeClick"
        :preview-src-list="[url]"
        hide-on-click-modal
        close-on-press-escape
    />
  </div>

</template>

<script>
export default {
  name:'bigImg',
  props: {
    url: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeClick() {
      //子组件可以使用 $emit 触发父组件的自定义事件
      this.$emit("closeClick");
    },
  },
  watch:{
    visible(val){
      if(val){
        // 点击img
        this.$nextTick(()=>{
          var img = document.getElementsByClassName('el-image__preview')[0];
          img.click();
          img.style.height=0;

        })



      }
    }
  }
};
</script>
<style lang="css" scoped>
.showPhoto {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;

}

.showPhoto .img {
  display: block;
  margin: auto 0;
  max-width: 80%;
  height: 60%;
  text-align: center;
  border-radius: 10px;
  overflow: hidden;
}
.showPhoto:hover .img {
  cursor: pointer;
}
</style>