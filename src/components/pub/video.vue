<template>
  <bread>视频外链</bread>
  <!--  <template v-if="loading">-->
  <!--    <a-skeleton active/>-->
  <!--    <a-skeleton active/>-->
  <!--    <a-skeleton active/>-->
  <!--  </template>-->

  <!--  <template v-else>-->
  <div v-loading="loading" style="margin-top: 49px;">
    <iframe :src="'https://'+add.replaceAll('*','/')" style="width:100vw; height: calc(100vh - 55px)"></iframe>
    <!--  </template>--></div>
</template>

<script>
export default {
  name: "video",
  data() {
    return {
      loading: true,
      add: '',

    };
  },
  beforeMount() {
    this.add = this.$route.params.add
    this.loading = false
  }
}
</script>

<style scoped>

</style>