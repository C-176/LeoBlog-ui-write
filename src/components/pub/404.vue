<template>
  <div class="whole">
    <a-empty>
      <template #description>
        404 找不到该页面
      </template>
      <a-button shape="round" @click="this.$router.go(-1)">点击返回上一页面</a-button>
    </a-empty>
  </div>
</template>


<script>
export default {
  name: "404"
}
</script>

<style scoped>

.whole {
  margin-left: calc(22.5%);
  margin-top: 60px;
  width: 55%;
  height: 100%;
  text-align: left;
  background-color: #fff;
  padding: 10px;
}

</style>